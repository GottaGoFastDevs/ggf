import React, {
  useRef,
  useMemo,
  useContext,
  unstable_createMutableSource as createMutableSource,
  unstable_useMutableSource as useMutableSource,
} from "react";
import { TextField } from "@material-ui/core";
import {
  pickOnlySupportedRules,
  pickEverythingThatIsNotASupportedRule,
} from "./rules";
import { FormContext } from "./Form";

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

function useFormState(stateRefSource) {
  return useMutableSource(
    stateRefSource,
    (stateRef) => cloneFormState(stateRef.current),
    subscribe
  );
}

function Field({ label, name, helperText, ...props }) {
  const formContext = useContext(FormContext);
  const formState = useFormState(formContext.stateRefSource);
  const error = formState.errors ? formState.errors[name] : null;

  formState.rules[name] = pickOnlySupportedRules(props);
  formState.labels[name] = label ?? name;

  props = pickEverythingThatIsNotASupportedRule(props);

  if (formState.values[name] === undefined) {
    formState.values[name] = null;
  }

  const handleChange = (value) => {
    if (value === "") {
      value = null;
    }

    formState.values[name] = value;

    formContext.validate();
    formContext.notifySubscribers();
  };

  return (
    <TextField
      onChange={(event) => handleChange(event.target.value)}
      value={formState.values[name] || ""}
      name={name}
      label={label ?? name}
      error={!!error}
      helperText={error ?? helperText}
      {...props}
    />
  );
}

export default Field;
