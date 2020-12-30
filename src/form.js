import React from "react";
import { TextField } from "@material-ui/core";
import { useGGFContext } from "./provider";

function useForm({ name }) {
  const { schema } = useGGFContext();

  const fields = {};

  for (const [key, field] of Object.entries(schema[name])) {
    fields[key] = <TextField label={key} name={key} />;
  }

  return { fields };
}

export { useForm };
