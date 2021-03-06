const escapeRegExp = (str) => {
  return str.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
};
const isValid = (value) => {
  return typeof value !== "undefined" && value !== null && value !== "";
};
const defaultProps = {
  filterOption: null,
  ignoreCase: true,
  labelKey: "label",
  matchPos: "any",
  matchProp: "any",
  trimFilter: true,
  valueKey: "value",
};
const filterOptions = (options, filterValue, excludeOptions, newProps) => {
  const props = {
    ...defaultProps,
    ...newProps,
  };
  if (props.ignoreCase) {
    filterValue = filterValue.toLowerCase();
  }
  if (props.trimFilter) {
    filterValue = filterValue.trim();
  }
  const excludeValues = (excludeOptions || []).reduce((acc, option) => {
    acc.add(option[props.valueKey]);
    return acc;
  }, /* @__PURE__ */ new Set());
  const re = new RegExp(
    `${props.matchPos === "start" ? "^" : ""}${escapeRegExp(filterValue)}`,
    props.ignoreCase ? "i" : ""
  );
  return options.filter((option) => {
    if (excludeValues.has(option[props.valueKey])) return false;
    if (props.filterOption) return props.filterOption.call(void 0, option, filterValue);
    if (!filterValue) return true;
    const value = option[props.valueKey];
    const label = option[props.labelKey];
    const hasValue = isValid(value);
    const hasLabel = isValid(label);
    if (!hasValue && !hasLabel) {
      return false;
    }
    const valueTest = hasValue ? String(value) : null;
    const labelTest = hasLabel ? String(label) : null;
    return (
      (valueTest && props.matchProp !== "label" && re.test(valueTest)) ||
      (labelTest && props.matchProp !== "value" && re.test(labelTest))
    );
  });
};
export default filterOptions;
