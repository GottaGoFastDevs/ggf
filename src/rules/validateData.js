import { enforce } from "vest";
import supportedVestRules from "./supportedVestRules";
import { translate } from "../lang";

function validateData({ rules, data, labels }) {
  console.log(data);
  console.log(rules);
  console.log(labels);

  const errors = {};

  for (const [fieldName, fieldRules] of Object.entries(rules)) {
    if (!fieldRules) continue;

    const fieldValue = data[fieldName];
    let lastRule;
    try {
      for (const [ruleName, ruleValue] of Object.entries(fieldRules)) {
        lastRule = {
          ruleName,
          ruleValue,
          fieldName,
          fieldValue,
          fieldLabel: labels[fieldName].toLowerCase(),
        };
        enforce(fieldValue)[supportedVestRules[ruleName]](ruleValue);
      }
    } catch (e) {
      errors[fieldName] = translate(lastRule);
      // errors[fieldName] = lastRule.ruleName;
    }
  }

  return Object.keys(errors).length === 0 ? null : errors;
}

export default validateData;
