import React from "react";
import { COUNTRIES } from "./constants";
import PhoneInputLite from "./phone-input-lite";
import defaultProps from "./default-props";
import type { PropsT } from "./types";

PhoneInput.defaultProps = defaultProps;

export default function PhoneInput(props: PropsT) {
  return <PhoneInputLite {...props} countries={COUNTRIES} />;
}
