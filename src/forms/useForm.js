import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  unstable_createMutableSource as createMutableSource,
  unstable_useMutableSource as useMutableSource,
} from "react";
import { DefaultInput, DefaultForm } from "./components";
import { useGGFContext } from "../provider";
import { validate } from "../validation";

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

function createEmptyInitialData(object) {
  const initialData = {};

  for (const field of Object.values(object.fields)) {
    initialData[field.name] = null;
  }

  return initialData;
}

function getFieldType(field) {
  return "text";
}

function cloneFormState(formState) {
  return { ...formState };
}

const newField = (useFormState, formContextRef, field) => ({
  helperText,
  ...props
}) => {
  const formState = useFormState();
  const formContext = formContextRef.current;
  const hasError = field.name in formState.errors;

  const handleChange = (event) => {
    let value = event.target.value;

    if (value === "") {
      value = null;
    }

    formState.data[field.name] = value;

    formContext.validate();
    formContext.notifySubscribers();
  };

  return (
    <DefaultInput
      key={field.name}
      name={field.name}
      type={getFieldType(field)}
      onChange={handleChange}
      value={formState.data[field.name] || ""}
      error={hasError}
      helperText={hasError ? formState.errors[field.name].message : helperText}
      {...props}
    />
  );
};

function createFields(formContextRef, formStateRefSource, object) {
  const useFormState = () => {
    return useMutableSource(
      formStateRefSource,
      (formStateRef) => cloneFormState(formStateRef.current),
      subscribe
    );
  };

  const fields = {};

  for (const field of Object.values(object.fields)) {
    fields[field.name] = newField(useFormState, formContextRef, field);
  }

  return fields;
}

class FormContext {
  constructor(formStateRef, struct) {
    this.formStateRef = formStateRef;
    this.struct = struct;
  }

  get state() {
    return this.formStateRef.current;
  }

  notifySubscribers() {
    for (const callback of this.state.subscriptions.values()) {
      callback();
    }
  }

  validate() {
    if (!this.state.dirty) {
      return;
    }

    const errors = validate(this.struct, this.state.data);
    this.state.errors = errors ?? {};

    return errors === null;
  }
}

class FormState {
  errors = {};
  dirty = false;

  subscriptions = new Map(); // Contains the callbacks of each field that are subscribed to the form state.
  version = 0; // Allows to know when the form state has changed.

  constructor(initialData) {
    this.data = initialData;
  }
}

function useFormStateRef(initialData, object) {
  const formState = useMemo(
    () => new FormState(initialData ?? createEmptyInitialData(object)),
    [initialData, object]
  );

  return useRef(formState);
}

function useFormContextRef(formStateRef, struct) {
  const formContext = useMemo(() => new FormContext(formStateRef, struct), [
    struct,
  ]);

  return useRef(formContext);
}

function useFormStateRefSource(formStateRef) {
  return useMemo(
    () => createMutableSource(formStateRef, () => formStateRef.current.version),
    []
  );
}

function useForm({ name, afterSubmit, initialData }) {
  const { schema, structs } = useGGFContext();
  const object = schema[name];
  const struct = structs[name];

  // Creation of a reference that contains the state of the form. This state is passed to all the fields of the form.
  const formStateRef = useFormStateRef(initialData, object);
  const formContextRef = useFormContextRef(formStateRef, struct);

  // This mutable source is used to be able to trigger a rendering on the concerned fields.
  const formStateRefSource = useFormStateRefSource(formStateRef);

  // Creation of the form fields. They are created only once to avoid that React rebuilds them at each rendering.
  const fields = useMemo(
    () => createFields(formContextRef, formStateRefSource, object),
    [formStateRefSource, object]
  );

  const handleSubmit = useMemo(
    () => (event) => {
      event.preventDefault();

      const formContext = formContextRef.current;

      formContext.state.dirty = true;
      const valid = formContext.validate();
      formContext.notifySubscribers();

      if (valid) {
        afterSubmit(formContext.state.data);
      }
    },
    []
  );

  // The form is memoized for the same reason as the fields.
  const form = useMemo(
    () => (props) => (
      <DefaultForm fields={fields} onSubmit={handleSubmit} {...props} />
    ),
    [fields]
  );

  // Expose useful objects to developers

  const { errors } = formStateRef.current;

  return { fields, errors, handleSubmit, form };
}

export default useForm;
