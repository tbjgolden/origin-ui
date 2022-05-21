import StatefulPhoneInputContainer from "./stateful-phone-input-container";
import PhoneInput from "./phone-input";
import defaultProps from "./default-props";
StatefulPhoneInput.defaultProps = defaultProps;
export default function StatefulPhoneInput(props) {
  return <StatefulPhoneInputContainer {...props}>{(childrenProps) => {
    return <PhoneInput {...childrenProps} />;
  }}</StatefulPhoneInputContainer>;
}
