import { enforce } from 'vest';
import { isTheSameType } from '.';

function throwValidationError(id, value) {
	throw {
		type: 'error',
		id: id,
		value: value
	};
}
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
			throw throwValidationError(ruleName, this.validationFieldRules[ruleName]);
		}
	}

	validate(value) {
		// Nullable
		if (!this.nullable && !value) {
			throw throwValidationError('null');
		}
		// Type
		if (value && !isTheSameType(this.type, value)) {
			throw throwValidationError('type');
		}
		// Rules
		for (const [ ruleName, ruleValue ] of Object.entries(this.validationFieldRules)) {
			this.enforceRule(value, ruleName);
		}
	}
}
