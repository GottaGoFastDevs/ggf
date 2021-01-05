import { createIntl, createIntlCache } from 'react-intl';

import errorMessages from './messages/error';
console.log(errorMessages);

const cache = createIntlCache();
const errorIntl = createIntl({
	locale: 'fr',
	defaultLocale: 'fr',
	messages: errorMessages,
	cache
});

function translate({ ruleName, ruleValue, fieldName, fieldValue, fieldLabel }) {
	// const id = ruleName;
	// console.log(errorIntl);
	// return errorIntl.formatMessage({ id: 'required' });
	return errorIntl.formatMessage({ id: 'required', ruleName, ruleValue, fieldName, fieldValue, fieldLabel });
}

export default translate;
