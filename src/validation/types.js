// String
export function isString(type) {
	return type === 'String';
}
// Number
export function isInt(type) {
	return type === 'Int';
}
export function isFloat(type) {
	return type === 'Float';
}
export function isNumeric(type) {
	return isInt(type) || isFloat(type);
}
// Boolean
export function isBoolean(type) {
	return type === 'Boolean';
}
export function enforceBooleanType(value) {
	if (value != true && value != false) {
		throw 'Not a boolean';
	}
}
// const types = { isString, isInt, isFloat, isNumeric, isBoolean, enforceBooleanType };
// export default types;
