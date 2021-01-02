import { assert, create } from "superstruct";

function validate(struct, values) {
  try {
    assert(create(values, struct), struct);

    return null;
  } catch (error) {
    const errors = {};

    const failures = error.failures();

    for (const failure of failures) {
      if (errors[failure.key]) {
        continue;
      }

      errors[failure.key] = failure;
    }

    return errors;
  }
}

export default validate;
