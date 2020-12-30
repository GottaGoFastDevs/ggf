function parseGraphQLSchema(graphQLSchema) {
  const schema = {};

  for (const definition of graphQLSchema.definitions) {
    const object = {};

    for (const field of definition.fields) {
      object[field.name.value] = {
        type: field.type.name.value,
      };
    }

    schema[definition.name.value] = object;
  }

  return schema;
}

export { parseGraphQLSchema };
