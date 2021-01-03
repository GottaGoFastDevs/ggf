export class ValidationDefinion {
	constructor(name, fields) {
		this.name = name;
		this.fields = fields;
	}

	validate(values) {
		var definitionErrors = {};
		for (const [ name, value ] of Object.entries(values)) {
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
