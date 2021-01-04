export class ValidationDefinion {
	constructor(name, fields, translate) {
		this.name = name;
		this.fields = fields;
		this.translate = translate;
	}

	validate(values) {
		var definitionErrors = {};
		for (const [ name, value ] of Object.entries(values)) {
			try {
				this.fields[name].validate(value);
			} catch (fieldError) {
				console.log(fieldError);
				definitionErrors[name] = this.translate(fieldError);
			}
		}
		if (Object.keys(definitionErrors).length !== 0) {
			throw definitionErrors;
		}
	}
}
