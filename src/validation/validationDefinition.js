export class ValidationDefinion {
	constructor(name, fields) {
		this.name = name;
		this.fields = fields;
	}

	validate(values, translate) {
		var definitionErrors = {};
		for (const [ name, value ] of Object.entries(values)) {
			try {
				this.fields[name].validate(value);
			} catch (fieldError) {
				console.log(fieldError);
				definitionErrors[name] = translate(fieldError);
			}
		}
		if (Object.keys(definitionErrors).length !== 0) {
			throw definitionErrors;
		}
	}
}
