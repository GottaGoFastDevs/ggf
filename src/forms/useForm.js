import React, { useState, useEffect } from "react";
import { DefaultInput, DefaultForm } from "./components";
import { useGGFContext } from "../provider";
import { validate } from "../validation";

function getInitialValues(object) {
  const initialValues = {};

  for (const field of Object.values(object.fields)) {
    initialValues[field.name] = null;
  }

  return initialValues;
}

function getFieldLabel(object, field, translate) {
  const labelDescriptor = {
    id: `${object.name}.${field.name}`,
    type: "label",
  };

  return translate(labelDescriptor);
}

function getFieldType(field) {
  return "text";
}

function useForm({ name }) {
  const { schema, translate, structs } = useGGFContext();
  const object = schema[name];
  const struct = structs[name];

  const [values, setValues] = useState(getInitialValues(object));
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dirty) {
      setErrors(validate(struct, values));
    }
  }, [values, dirty]);

  const fields = {};

  for (const field of Object.values(object.fields)) {
    const onChange = (event) => {
      let value = event.target.value;

      if (value === "") {
        value = null;
      }

      setValues({
        ...values,
        [field.name]: value,
      });
    };

    const hasError = field.name in errors;

    fields[field.name] = (
      <DefaultInput
        key={field.name}
        label={getFieldLabel(object, field, translate)}
        type={getFieldType(field)}
        name={field.name}
        onChange={onChange}
        value={values[field.name] || ""}
        error={hasError}
        helperText={hasError ? errors[field.name].message : ""}
      />
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setDirty(true);
  };

  const form = <DefaultForm fields={fields} onSubmit={handleSubmit} />;

  return { fields, errors, handleSubmit, form };
}

export default useForm;
