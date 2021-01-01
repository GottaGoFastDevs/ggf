import * as s from "superstruct";

function fieldToType(field) {
  if (field.type === "String") {
    return s.string();
  }

  if (field.type === "Int") {
    return s.integer();
  }

  if (field.type === "Float") {
    return s.number();
  }

  if (field.type === "Boolean") {
    return s.boolean();
  }

  return s.any();
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
