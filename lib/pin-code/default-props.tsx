import { SIZE } from "../input/index";

const defaultProps = {
  "aria-label": "Please enter your pin code",
  "aria-labelledby": null,
  "aria-describedby": null,
  autoComplete: "one-time-code",
  autoFocus: false,
  disabled: false,
  error: false,
  id: null,
  name: null,
  onChange: () => {},
  overrides: {},
  placeholder: "○",
  positive: false,
  required: false,
  size: SIZE.default,
  manageFocus: true,
  values: ["", "", "", ""],
  mask: false,
};

export default defaultProps;
