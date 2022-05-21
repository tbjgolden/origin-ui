import React from "react";
import StatefulPhoneInputContainer from "./stateful-phone-input-container";
import PhoneInput from "./phone-input";
import defaultProps from "./default-props";
import type { PropsT, StatefulPhoneInputPropsT } from "./types";

StatefulPhoneInput.defaultProps = defaultProps;

export default function StatefulPhoneInput(props: StatefulPhoneInputPropsT) {
  return (
    <StatefulPhoneInputContainer {...props}>
      {(childrenProps: PropsT) => {
        return <PhoneInput {...childrenProps} />;
      }}
    </StatefulPhoneInputContainer>
  );
}
