const supportedVestRules = {
	required: 'isNotEmpty',
	matches: 'matches',
	// Numeric
	numeric: 'isNumeric',
	min: 'greaterThanOrEquals',
	max: 'lessThanOrEquals',
	// String
	string: 'isString',
	minLenght: 'longerThanOrEquals',
	maxLenght: 'shorterThanOrEquals'
};

export default supportedVestRules;
