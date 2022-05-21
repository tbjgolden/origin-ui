
import type { PropsT, OptionT, OptionsT, OptgroupsT, ValueT } from "../types.js";

function groupedOptionsToArray(groupedOptions: OptgroupsT): ValueT {
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

export function normalizeOptions(options: OptionsT): ValueT {
  if (options) {
    if (Array.isArray(options)) {
      return options;
    } else {
      return groupedOptionsToArray(options);
    }
  }

  return [];
}

export const expandValue = (value: OptionT, props: $Shape<PropsT>): OptionT => {
  if (!props.options) return value;

  const normalizedOptions = normalizeOptions(props.options);
  for (let i = 0; i < normalizedOptions.length; i++) {
    if (String(normalizedOptions[i][props.valueKey]) === String(value[props.valueKey])) {
      return normalizedOptions[i];
    }
  }
  return value;
};
