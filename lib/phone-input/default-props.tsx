import {
  SIZE,
  DEFAULT_MAX_DROPDOWN_HEIGHT,
  DEFAULT_MAX_DROPDOWN_WIDTH,
} from "./constants";
const defaultProps = {
  "aria-label": "Please enter a phone number without the country dial code.",
  "aria-describedby": null,
  "aria-labelledby": null,
  clearable: true,
  focusLock: false,
  country: { label: "United States", id: "US", dialCode: "+1" },
  disabled: false,
  error: false,
  id: null,
  maxDropdownHeight: DEFAULT_MAX_DROPDOWN_HEIGHT,
  maxDropdownWidth: DEFAULT_MAX_DROPDOWN_WIDTH,
  name: null,
  onCountryChange: () => {},
  onTextChange: () => {},
  overrides: {},
  positive: false,
  required: false,
  size: SIZE.default,
  text: "",
};
export default defaultProps;
