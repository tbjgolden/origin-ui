import { COUNTRIES } from "./constants";
import PhoneInputLite from "./phone-input-lite";
import defaultProps from "./default-props";
PhoneInput.defaultProps = defaultProps;
export default function PhoneInput(props) {
  return <PhoneInputLite {...props} countries={COUNTRIES} />;
}
