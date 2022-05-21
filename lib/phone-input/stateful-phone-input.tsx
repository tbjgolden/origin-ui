import React from "react";
import StatefulPhoneInputContainer from "./stateful-phone-input-container.js";
import PhoneInput from "./phone-input.js";
import defaultProps from "./default-props.js";
import type { PropsT, StatefulPhoneInputPropsT } from "./types.js";

StatefulPhoneInput.defaultProps = defaultProps;

export default function StatefulPhoneInput(props: StatefulPhoneInputPropsT) {
  return (
    <StatefulPhoneInputContainer {...props}>
      {(childrenProps: PropsT) => <PhoneInput {...childrenProps} />}
    </StatefulPhoneInputContainer>
  );
}
