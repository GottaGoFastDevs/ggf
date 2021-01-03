import * as s from "superstruct";
import { assert } from "superstruct"

// String
function isAString(type) {
  return type === "String"
}
function getStringType() {
    return s.string()
}
// Number
function isAInt(type) {
    return type === "Int"
}
function isAFloat(field) {
  return type === "Float"
}
function getNumberType() {
    return s.coerce(s.integer(), s.string(), (value) =>
      value === null ? null : Number(value)
    );
}
// Boolean
function isABoolean(type) {
    return type === "Boolean"
}
function getBooleanType(type) {
    return s.boolean()
}
// Type
function getSuperstructType(type) {
    if (isAString(type)) {
        return getStringType()
    }
    if (isAInt(type) || isAFloat(type)) {
        return getNumberType()
    }
    if (isABoolean(type)) {
        return getBooleanType()
    }
    return s.any()
}

function getType(type, nullable) {
    return nullable ? s.nullable(getSuperstructType(type)) : getSuperstructType(type)
}


function isTheSameType(type, nullable, value) {
    try {
        assert(value, getType(nullable, type))
    } catch(e) {
        return false
    }
    return true
}

export default isTheSameType