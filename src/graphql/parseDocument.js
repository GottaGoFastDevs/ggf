function parseType(type) {
  if (type.kind === "NonNullType") {
    return {
      ...parseType(type.type),
      nullable: false,
    };
  }

  return {
    type: type.name.value,
    nullable: true,
  };
}

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
        ...parseType(field.type),
      };
    }

    schema[object.name] = object;
  }

  return schema;
}

export default parseDocument;
