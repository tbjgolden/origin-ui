import React from "react";
import StatefulPhoneInputContainer from "./stateful-phone-input-container";
import PhoneInputNext from "./phone-input-next";
import defaultProps from "./default-props";
import type { PropsT, StatefulPhoneInputPropsT } from "./types";

StatefulPhoneInputNext.defaultProps = { ...defaultProps, clearable: true };

export default function StatefulPhoneInputNext(props: StatefulPhoneInputPropsT) {
  return (
    <StatefulPhoneInputContainer {...props}>
      {(childrenProps: PropsT) => {
        return <PhoneInputNext {...childrenProps} />;
      }}
    </StatefulPhoneInputContainer>
  );
}
