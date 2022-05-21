function groupedOptionsToArray(groupedOptions) {
  return Object.keys(groupedOptions).reduce((arr, optgroup) => {
    const optgroupOptions = groupedOptions[optgroup];
    return arr.concat(
      optgroupOptions.map((option) => {
        return {
          ...option,
          __optgroup: optgroup,
        };
      })
    );
  }, []);
}
export function normalizeOptions(options) {
  if (options) {
    return Array.isArray(options) ? options : groupedOptionsToArray(options);
  }
  return [];
}
export const expandValue = (value, props) => {
  if (!props.options) return value;
  const normalizedOptions = normalizeOptions(props.options);
  for (const normalizedOption of normalizedOptions) {
    if (String(normalizedOption[props.valueKey]) === String(value[props.valueKey])) {
      return normalizedOption;
    }
  }
  return value;
};
