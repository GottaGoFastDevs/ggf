const errorMessages = {
	// fr: [
	// 	{
	// 		id: 'required',
	// 		defaultMessage: 'Le champ {fieldLabel} ne doit pas être vide'
	// 	}
	// ]
	fr: {
		required: 'Le champ {fieldLabel} ne doit pas être vide',
		type: "Le champ {fieldLabel} n'est pas du bon type",
		min: 'La valeur doit être égale ou plus grande que {ruleValue}',
		max: 'La valeur doit être égale ou plus petite que {ruleValue}'
	}
};

export default errorMessages;
