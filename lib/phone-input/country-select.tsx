import { StyledDialCode, StyledCountrySelectContainer } from "./styled-components";
import BaseCountryPicker from "./base-country-picker";
import { SingleSelect as DefaultSelect } from "../select";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import defaultProps from "./default-props";
CountrySelect.defaultProps = {
  disabled: defaultProps.disabled,
  inputRef: { current: null },
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  maxDropdownWidth: defaultProps.maxDropdownWidth,
  overrides: {},
  size: defaultProps.size,
  error: defaultProps.error,
  positive: defaultProps.positive,
  required: defaultProps.required,
};
export default function CountrySelect(props) {
  const { country, disabled, error, overrides, positive, required, size } = props;
  const sharedProps = {
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $required: required,
    $size: size,
  };
  const baseSelectOverrides = {
    ControlContainer: {
      style: (props2) => {
        if (!props2.$isFocused && !props2.$isPseudoFocused) {
          return {
            backgroundColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          };
        }
      },
    },
  };
  const [Select, selectProps] = getOverrides(overrides.CountrySelect, DefaultSelect);
  const selectOverrides = mergeOverrides(baseSelectOverrides, {
    Dropdown: overrides.CountrySelectDropdown || {},
    DropdownListItem: overrides.CountrySelectDropdownListItem || {},
  });
  selectProps.overrides = mergeOverrides(selectOverrides, selectProps.overrides);
  const [CountrySelectContainer, countrySelectContainerProps] = getOverrides(
    overrides.CountrySelectContainer,
    StyledCountrySelectContainer
  );
  const [DialCode, dialCodeProps] = getOverrides(overrides.DialCode, StyledDialCode);
  return (
    <CountrySelectContainer {...countrySelectContainerProps}>
      <BaseCountryPicker
        {...props}
        overrides={{
          ...overrides,
          CountrySelect: {
            component: Select,
            props: selectProps,
          },
        }}
      />
      <DialCode {...sharedProps} {...dialCodeProps}>
        {country.dialCode}
      </DialCode>
    </CountrySelectContainer>
  );
}
