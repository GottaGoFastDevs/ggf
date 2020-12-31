function parseDocument(document) {
  const schema = {};

  for (const definition of document.definitions) {
    const object = {};

    for (const field of definition.fields) {
      object[field.name.value] = {
        name: field.name.value,
        type: field.type.name.value,
      };
    }

    schema[definition.name.value] = object;
  }

  return schema;
}

export { parseDocument };
