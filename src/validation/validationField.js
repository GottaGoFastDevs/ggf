import { enforce } from 'vest';
import { isTheSameType } from '.';

export class ValidationField {
	constructor({ name, type, nullable }, validationFieldRules) {
		//
		this.name = name;
		this.type = type;
		this.nullable = nullable;

		// Rules
		// TODO : Verify rules
		this.validationFieldRules = { ...validationFieldRules };
	}

	enforceRule(value, ruleName) {
		try {
			enforce(value)[ruleName](this.validationFieldRules[ruleName]);
		} catch (e) {
			throw ruleName;
		}
	}

	validate(value) {
		// Nullable
		if (!this.nullable && !value) {
			throw 'null';
		}
		// Type
		if (!isTheSameType(this.type, value)) {
			throw 'type';
		}
		// Rules
		for (const [ ruleName, ruleValue ] of Object.entries(this.validationFieldRules)) {
			console.log(ruleName);
			this.enforceRule(value, ruleName);
		}
	}
}
