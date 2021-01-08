import React, {
  useRef,
  useMemo,
  unstable_createMutableSource as createMutableSource,
  createContext,
} from "react";
import { validateData } from "./rules";

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

class FormContextValue {
  constructor(stateRef, stateRefSource) {
    this.stateRef = stateRef;
    this.stateRefSource = stateRefSource;
  }

  get state() {
    return this.stateRef.current;
  }

  validate() {
    if (!this.state.dirty) {
      return true;
    }

    // Rules
    this.state.errors = validateData({
      rules: this.state.rules,
      data: this.state.values,
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

  constructor(initialValues) {
    this.values = initialValues;
    this.rules = {};
    this.labels = {};
  }
}

function useFormStateRef(initialValues) {
  const formState = useMemo(() => new FormState(initialValues ?? {}), [
    initialValues,
  ]);

  return useRef(formState);
}

function useFormContextRef(formStateRef, formStateRefSource) {
  const formContext = useMemo(
    () => new FormContextValue(formStateRef, formStateRefSource),
    []
  );

  return useRef(formContext);
}

function useFormStateRefSource(formStateRef) {
  return useMemo(
    () => createMutableSource(formStateRef, () => formStateRef.current.version),
    []
  );
}

const FormContext = createContext();

function Form({ initialValues, children, onSubmit, ...props }) {
  const stateRef = useFormStateRef(initialValues);
  const stateRefSource = useFormStateRefSource(stateRef);
  const contextRef = useFormContextRef(stateRef, stateRefSource);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formContext = contextRef.current;

    formContext.state.dirty = true;
    const valid = formContext.validate();
    formContext.notifySubscribers();

    if (valid) {
      onSubmit(formContext.state.values);
    }
  };

  return (
    <FormContext.Provider value={contextRef.current}>
      <form noValidate onSubmit={handleSubmit} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
export { FormContext };
