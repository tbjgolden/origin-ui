import * as React from "react";
// eslint-disable-next-line import/no-named-default
import StatefulContainer from "./stateful-radiogroup-container.js";
// eslint-disable-next-line import/no-named-default
import RadioGroup from "./radiogroup.js";
import type { PropsT, StatefulRadioGroupPropsT } from "./types.js";
// Styled elements

const StatefulRadioGroup = function (props: StatefulRadioGroupPropsT) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(childrenProps: PropsT) => <RadioGroup {...childrenProps}>{children}</RadioGroup>}
    </StatefulContainer>
  );
};
StatefulRadioGroup.displayName = "StatefulRadioGroup";
export default StatefulRadioGroup;
