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

    let type = "text";

    if (field.type === "Int" || field.type === "Float") {
      type = "number";
    }

    fields[field.name] = (
      <DefaultInput label={label} name={field.name} type={type} />
    );
  }

  return { fields };
}

export default useForm;
