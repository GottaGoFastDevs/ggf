import React from "react";
import { DefaultInput } from "components";
import { useGGFContext } from "./provider";

function useForm({ name }) {
  const { schema } = useGGFContext();

  const fields = {};

  for (const object of schema) {
    fields[object.name] = <DefaultInput label={key} name={key} />;
  }

  return { fields };
}

export { useForm };
