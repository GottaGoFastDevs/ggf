const errorMessages = {
	fr: {
		required: 'Le champ {fieldLabel} ne doit pas être vide',
		matches: "Le champ {fieldLabel} n'est pas au bon format ({ruleValue})",
		// Numeric
		numeric: 'Le champ {fieldLabel} doit correspondre à un nombre',
		min: 'La valeur doit être égale ou plus grande que {ruleValue}',
		max: 'La valeur doit être égale ou plus petite que {ruleValue}',
		// String
		string: 'Le champ {fieldLabel} doit correspondre à une chaîne de caractère',
		minLenght: 'Le champ {fieldLabel} doit avoir au moins {ruleValue} caractères',
		maxLenght: 'Le champ {fieldLabel} doit avoir au maximum {ruleValue} caractères'
	}
};

export default errorMessages;
