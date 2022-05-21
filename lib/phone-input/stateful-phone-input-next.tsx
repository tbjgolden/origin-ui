import StatefulPhoneInputContainer from "./stateful-phone-input-container";
import PhoneInputNext from "./phone-input-next";
import defaultProps from "./default-props";
StatefulPhoneInputNext.defaultProps = { ...defaultProps, clearable: true };
export default function StatefulPhoneInputNext(props) {
  return (
    <StatefulPhoneInputContainer {...props}>
      {(childrenProps) => {
        return <PhoneInputNext {...childrenProps} />;
      }}
    </StatefulPhoneInputContainer>
  );
}
