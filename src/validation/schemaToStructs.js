import * as s from "superstruct";

function getTypeFromField(field) {
  return field.type
}
function isAString(field) {
  return getTypeFromField(field) === "String"
}
function isAInt(field) {
  return getTypeFromField(field) === "Int"
}
function isAFloat(field) {
  return getTypeFromField(field) === "Float"
}
function isABoolean(field) {
  return getTypeFromField(field) === "Boolean"
}

function fieldToType(field) {
  console.debug("field", field);

  let type = s.any();

  if (isAString(field)) {
    type = s.string();
  } else if (isAInt(field)) {
    type = s.coerce(s.integer(), s.string(), (value) =>
      value === null ? null : Number(value)
    );
  } else if (isAFloat(field)) {
    type = s.coerce(s.number(), s.string(), (value) =>
      value === null ? null : Number(value)
    );
  } else if (isABoolean(field)) {
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
