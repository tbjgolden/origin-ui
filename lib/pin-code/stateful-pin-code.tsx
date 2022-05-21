import React from "react";
import defaultProps from "./default-props";
import PinCode from "./pin-code";
import StatefulPinCodeContainer from "./stateful-pin-code-container";
import type { PropsT, StatefulPinCodePropsT } from "./types";

StatefulPinCode.defaultProps = defaultProps;

export default function StatefulPinCode(props: StatefulPinCodePropsT) {
  return (
    <StatefulPinCodeContainer {...props}>
      {(childrenProps: PropsT) => {
        return <PinCode {...childrenProps} />;
      }}
    </StatefulPinCodeContainer>
  );
}
