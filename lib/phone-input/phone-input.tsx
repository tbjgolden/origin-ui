
import React from "react";
import { COUNTRIES } from "./constants.js";
import PhoneInputLite from "./phone-input-lite.js";
import defaultProps from "./default-props.js";
import type { PropsT } from "./types.js";

PhoneInput.defaultProps = defaultProps;

export default function PhoneInput(props: PropsT) {
  return <PhoneInputLite {...props} countries={COUNTRIES} />;
}
