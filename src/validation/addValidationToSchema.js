import { isTheSameType } from ".";

function getValidationFieldRules(
  validationSchemaFile,
  definitionName,
  fieldName
) {
  if (
    !validationSchemaFile ||
    !validationSchemaFile[definitionName] ||
    !validationSchemaFile[definitionName][fieldName]
  )
    return null;

  return validationSchemaFile[definitionName][fieldName];
}

// class validationField
class validationField {
  constructor({ name, type, nullable }, validationFieldRules) {
    this.name = name;
    this.type = type;
    this.validationFieldRules = { ...validationFieldRules, nullable };
  }

  validate(value) {
    var rules = this.validationFieldRules;
    // Nullable
    if (!rules.nullable && !value) {
      throw "null";
    }
    // Type
    if (!isTheSameType(this.type, rules.nullable, value)) {
      throw "type";
    }
  }
}

class validationDefinion {
  constructor(name, fields) {
    this.name = name;
    this.fields = fields;
  }

  validate(values) {
    var definitionErrors = {};
    for (const [name, value] of Object.entries(values)) {
      try {
        this.fields[name].validate(value);
      } catch (fieldError) {
        definitionErrors[name] = fieldError;
      }
    }
    if (Object.keys(definitionErrors).length !== 0) {
      throw definitionErrors;
    }
  }
}

function addValidationToSchema(validationSchemaFile, schemaWithoutValidation) {
  const schema = {};

  for (const [definitionName, definition] of Object.entries(
    schemaWithoutValidation
  )) {
    const fields = {};

    for (const [fieldName, fieldBody] of Object.entries(definition.fields)) {
      const validationFieldRules = getValidationFieldRules(
        validationSchemaFile,
        definitionName,
        fieldName
      );

      fields[fieldName] = new validationField({
        ...fieldBody,
        validationFieldRules,
      });
    }

    schema[definitionName] = new validationDefinion(definitionName, fields);
  }

  return schema;
}

export default addValidationToSchema;
