import BaseCountryPicker from "./base-country-picker";
import { SIZE } from "./constants";
import { SingleSelect as DefaultSelect } from "../select";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import defaultProps from "./default-props";
CountryPicker.defaultProps = {
  disabled: defaultProps.disabled,
  inputRef: { current: null },
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  maxDropdownWidth: defaultProps.maxDropdownWidth,
  overrides: {},
  size: defaultProps.size,
  error: defaultProps.error,
  positive: defaultProps.positive,
  required: defaultProps.required
};
export default function CountryPicker(props) {
  const { overrides } = props;
  const baseSelectOverrides = {
    Root: {
      style: ({ $theme: { direction, sizing } }) => {
        const marginDir = direction === "rtl" ? "marginLeft" : "marginRight";
        return {
          [marginDir]: sizing.scale300,
          width: "auto"
        };
      }
    },
    ControlContainer: {
      style: ({ $theme: { direction, sizing }, ...props2 }) => {
        const sizeToLeftPadding = {
          [SIZE.mini]: "0",
          [SIZE.compact]: sizing.scale0,
          [SIZE.default]: sizing.scale200,
          [SIZE.large]: sizing.scale400
        };
        const sizeToRightPadding = {
          [SIZE.mini]: sizing.scale400,
          [SIZE.compact]: sizing.scale500,
          [SIZE.default]: sizing.scale600,
          [SIZE.large]: sizing.scale700
        };
        const padStartDir = direction === "rtl" ? "paddingRight" : "paddingLeft";
        const padEndDir = direction === "rtl" ? "paddingLeft" : "paddingRight";
        const styleOverride = {
          [padStartDir]: sizeToLeftPadding[props2.$size || SIZE.default],
          [padEndDir]: sizeToRightPadding[props2.$size || SIZE.default]
        };
        if (!props2.$isFocused && !props2.$isPseudoFocused) {
          return {
            ...styleOverride,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderTopColor: "transparent",
            borderBottomColor: "transparent"
          };
        }
        return styleOverride;
      }
    }
  };
  const [Select, selectProps] = getOverrides(overrides.CountrySelect, DefaultSelect);
  const selectOverrides = mergeOverrides(baseSelectOverrides, {
    Dropdown: overrides.CountrySelectDropdown || {},
    DropdownListItem: overrides.CountrySelectDropdownListItem || {}
  });
  selectProps.overrides = mergeOverrides(selectOverrides, selectProps.overrides);
  const baseOverrides = {
    FlagContainer: {
      style: ({ $theme: { direction, sizing }, ...props2 }) => {
        const sizeToMargin = {
          [SIZE.mini]: sizing.scale200,
          [SIZE.compact]: sizing.scale300,
          [SIZE.default]: sizing.scale400,
          [SIZE.large]: sizing.scale500
        };
        const marginDir = direction === "rtl" ? "marginLeft" : "marginRight";
        return {
          [marginDir]: sizeToMargin[props2.$size || SIZE.default]
        };
      }
    },
    DialCode: {
      style: ({ $theme: { direction, sizing } }) => {
        const marginDir = direction === "rtl" ? "marginRight" : "marginLeft";
        return {
          [marginDir]: sizing.scale600
        };
      }
    }
  };
  const mergedOverrides = mergeOverrides(baseOverrides, overrides);
  return <BaseCountryPicker {...props} overrides={{
    ...mergedOverrides,
    CountrySelect: {
      component: Select,
      props: selectProps
    }
  }} />;
}
