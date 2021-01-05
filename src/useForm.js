import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  unstable_createMutableSource as createMutableSource,
  unstable_useMutableSource as useMutableSource,
} from "react";
import { Rifm } from "rifm";
import { TextField } from "@material-ui/core";
import { pickOnlySupportedRules, validateData } from "./rules";

let numberOfSubscriptions = 0;

function subscribe(formStateRef, callback) {
  const subscriptionID = numberOfSubscriptions++;

  formStateRef.current.subscriptions.set(subscriptionID, () => {
    callback();
  });

  return () => {
    formStateRef.current.subscriptions.delete(subscriptionID);
  };
}

function cloneFormState(formState) {
  return { ...formState };
}

function Field({ error, helperText, ...props }) {
  return (
    <TextField error={!!error} helperText={error ?? helperText} {...props} />
  );
}

const newField = (useFormState, formContextRef, name) => ({
  helperText,
  format,
  ...props
}) => {
  const formState = useFormState();
  const formContext = formContextRef.current;
  const error = formState.errors ? formState.errors[name] : null;

  const label = props.label ?? name;

  // Rules
  formState.rules[name] = pickOnlySupportedRules(props);
  // Labels
  formState.labels[name] = label;

  const handleChange = (value) => {
    if (value === "") {
      value = null;
    }

    formState.data[name] = value;

    formContext.validate();
    formContext.notifySubscribers();
  };

  const value = formState.data[name] || "";

  if (format) {
    return (
      <Rifm onChange={handleChange} value={value} format={format}>
        {({ onChange, value }) => (
          <Field
            onChange={onChange}
            value={value}
            name={name}
            label={label}
            error={error}
            {...props}
          />
        )}
      </Rifm>
    );
  }

  return (
    <Field
      onChange={(event) => handleChange(event.target.value)}
      value={value}
      name={name}
      label={label}
      error={error}
      {...props}
    />
  );
};

function getFieldNameFromProperty(property) {
  return property[0].toLowerCase() + property.slice(1);
}

function createFields(formContextRef, formStateRefSource) {
  const useFormState = () => {
    return useMutableSource(
      formStateRefSource,
      (formStateRef) => cloneFormState(formStateRef.current),
      subscribe
    );
  };

  return new Proxy(
    {},
    {
      get(target, property) {
        if (!(property in target)) {
          const fieldName = getFieldNameFromProperty(property);

          target[property] = newField(useFormState, formContextRef, fieldName);
        }

        return target[property];
      },
    }
  );
}

class FormContext {
  constructor(formStateRef) {
    this.formStateRef = formStateRef;
  }

  get state() {
    return this.formStateRef.current;
  }

  validate() {
    if (!this.state.dirty) {
      return true;
    }

    // Rules
    this.state.errors = validateData({
      rules: this.state.rules,
      data: this.state.data,
      labels: this.state.labels,
    });
    return this.state.errors == null;
  }

  notifySubscribers() {
    for (const callback of this.state.subscriptions.values()) {
      callback();
    }
  }
}

class FormState {
  errors = {};
  dirty = false;

  subscriptions = new Map(); // Contains the callbacks of each field that are subscribed to the form state.
  version = 0; // Allows to know when the form state has changed.

  constructor(initialData) {
    this.data = initialData;
    this.rules = {};
    this.labels = {};
  }
}

function useFormStateRef(initialData) {
  const formState = useMemo(() => new FormState(initialData ?? {}), [
    initialData,
  ]);

  return useRef(formState);
}

function useFormContextRef(formStateRef) {
  const formContext = useMemo(() => new FormContext(formStateRef), []);

  return useRef(formContext);
}

function useFormStateRefSource(formStateRef) {
  return useMemo(
    () => createMutableSource(formStateRef, () => formStateRef.current.version),
    []
  );
}

function useForm({ initialData } = {}) {
  // Creation of a reference that contains the state of the form. This state is passed to all the fields of the form.
  const formStateRef = useFormStateRef(initialData);
  const formContextRef = useFormContextRef(formStateRef);

  // This mutable source is used to be able to trigger a rendering on the concerned fields.
  const formStateRefSource = useFormStateRefSource(formStateRef);

  // Creation of the form fields. They are created only once to avoid that React rebuilds them at each rendering.
  const Fields = useMemo(
    () => createFields(formContextRef, formStateRefSource),
    [formStateRefSource]
  );

  const handleSubmit = useMemo(
    () => (onSubmit) => (event) => {
      event.preventDefault();

      const formContext = formContextRef.current;

      formContext.state.dirty = true;
      const valid = formContext.validate();
      formContext.notifySubscribers();

      if (valid) {
        onSubmit(formContext.state.data);
      }
    },
    []
  );

  return { Fields, handleSubmit };
}

export default useForm;
