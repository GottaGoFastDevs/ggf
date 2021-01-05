const supportedVestRules = {
	required: 'isNotEmpty',
	matches: 'matches',
	// Numeric
	numeric: 'isNumeric',
	min: 'greaterThanOrEquals',
	max: 'lessThanOrEquals',
	// String
	string: 'isString',
	minLength: 'longerThanOrEquals',
	maxLength: 'shorterThanOrEquals'
};

export default supportedVestRules;
