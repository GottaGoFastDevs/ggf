import React from "react";
import { DefaultInput } from "./components";
import { useGGFContext } from "../provider";

function useForm({ name }) {
  const { schema, translate } = useGGFContext();
  const object = schema[name];

  const fields = {};

  for (const field of Object.values(object.fields)) {
    const labelDescriptor = {
      id: `${object.name}.${field.name}`,
      type: "label",
    };

    const label = translate(labelDescriptor);

    fields[field.name] = <DefaultInput label={label} name={field.name} />;
  }

  return { fields };
}

export { useForm };
