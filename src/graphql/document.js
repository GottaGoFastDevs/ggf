function parseDocument(document) {
  const schema = {};

  for (const definition of document.definitions) {
    const object = {
      name: definition.name.value,
      fields: {},
    };

    for (const field of definition.fields) {
      object.fields[field.name.value] = {
        name: field.name.value,
        type: field.type.name.value,
      };
    }

    schema[object.name] = object;
  }

  return schema;
}

export { parseDocument };
