import React from "react";
import { TextField } from "@material-ui/core";
import { useGGFContext } from "./provider";

function useForm({ name }) {
  const { schema } = useGGFContext();

  const fields = {};

  for (const object of schema) {
    fields[object.name] = <TextField label={key} name={key} />;
  }

  return { fields };
}

export { useForm };
