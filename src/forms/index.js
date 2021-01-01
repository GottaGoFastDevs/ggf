import React from "react";
import { DefaultInput } from "./components";
import { useGGFContext } from "../provider";

function useForm({ name }) {
  const { schema } = useGGFContext();
  const object = schema[name];

  const fields = {};

  for (const field of Object.values(object)) {
    fields[field.name] = <DefaultInput label={field.name} name={field.name} />;
  }

  return { fields };
}

export { useForm };
