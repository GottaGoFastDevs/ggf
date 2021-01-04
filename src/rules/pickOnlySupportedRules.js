import supportedVestRules from './supportedVestRules';
const supportedRuleKeys = Object.keys(supportedVestRules);

function pickOnlySupportedRules(props) {
	if (!props) {
		return null;
	}
	const supportedRules = Object.fromEntries(
		Object.entries(props).filter(([ key ]) => supportedRuleKeys.includes(key))
	);
	return Object.keys(supportedRules).length === 0 ? null : supportedRules;
}

export default pickOnlySupportedRules;
