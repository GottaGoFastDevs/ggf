import { isString, isNumeric, isBoolean, enforceBooleanType } from '.';
import enforce from 'vest/enforceExtended';

function isTheSameType(type, value) {
	try {
		if (isString(type)) {
			enforce(value).isString();
		} else if (isNumeric(type)) {
			enforce(value).isNumeric();
		} else if (isBoolean(type)) {
			enforceBooleanType(value);
		}
	} catch (e) {
		return false;
	}
	return true;
}

export default isTheSameType;
