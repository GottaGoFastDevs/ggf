import * as s from "superstruct";

function fieldToType(field) {
  console.debug("field", field);

  let type = s.any();

  if (field.type === "String") {
    type = s.string();
  } else if (field.type === "Int") {
    type = s.coerce(s.integer(), s.string(), (value) =>
      value === null ? null : Number(value)
    );
  } else if (field.type === "Float") {
    type = s.coerce(s.number(), s.string(), (value) =>
      value === null ? null : Number(value)
    );
  } else if (field.type === "Boolean") {
    type = s.boolean();
  }

  if (field.nullable) {
    console.debug("This field is nullable.");

    type = s.nullable(type);
  }

  return type;
}

function objectToStruct(object) {
  const fields = {};

  for (const field of Object.values(object.fields)) {
    fields[field.name] = fieldToType(field);
  }

  return s.object(fields);
}

function schemaToStructs(schema) {
  const structs = {};

  for (const object of Object.values(schema)) {
    structs[object.name] = objectToStruct(object);
  }

  return structs;
}

export default schemaToStructs;
