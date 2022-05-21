import defaultProps from "./default-props";
import PinCode from "./pin-code";
import StatefulPinCodeContainer from "./stateful-pin-code-container";
StatefulPinCode.defaultProps = defaultProps;
export default function StatefulPinCode(props) {
  return <StatefulPinCodeContainer {...props}>{(childrenProps) => {
    return <PinCode {...childrenProps} />;
  }}</StatefulPinCodeContainer>;
}
