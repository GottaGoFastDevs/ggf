import { ValidationDefinion, ValidationField } from '.';

function getValidationFieldRules(validationSchemaFile, definitionName, fieldName) {
	if (
		!validationSchemaFile ||
		!validationSchemaFile[definitionName] ||
		!validationSchemaFile[definitionName][fieldName]
	)
		return null;

	return validationSchemaFile[definitionName][fieldName];
}

function addValidationToSchema(validationSchemaFile, schemaWithoutValidation) {
	const schema = {};

	for (const [ definitionName, definition ] of Object.entries(schemaWithoutValidation)) {
		const fields = {};

		for (const [ fieldName, fieldBody ] of Object.entries(definition.fields)) {
			const validationFieldRules = getValidationFieldRules(validationSchemaFile, definitionName, fieldName);

			fields[fieldName] = new ValidationField(fieldBody, validationFieldRules);
		}

		schema[definitionName] = new ValidationDefinion(definitionName, fields);
	}

	return schema;
}

export default addValidationToSchema;
