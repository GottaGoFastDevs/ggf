import { enforce } from 'vest';
import supportedVestRules from './supportedVestRules';

function validateData(data, rules) {
	console.log(data);
	console.log(rules);

	const errors = {};

	for (const [ fieldName, fieldRules ] of Object.entries(rules)) {
		if (!fieldRules) continue;

		const fieldValue = data[fieldName];
		let lastRuleName;
		try {
			for (const [ ruleName, ruleValue ] of Object.entries(fieldRules)) {
				lastRuleName = ruleName;
				enforce(fieldValue)[supportedVestRules[ruleName]](ruleValue);
			}
		} catch (e) {
			errors[fieldName] = lastRuleName;
		}
	}

	return Object.keys(errors).length === 0 ? null : errors;
}

export default validateData;
