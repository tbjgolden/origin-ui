import * as React from "react";
// eslint-disable-next-line import/no-named-default
import { default as StatefulContainer } from "./stateful-checkbox-container";
// eslint-disable-next-line import/no-named-default
import { default as Checkbox } from "./checkbox";
import type { StatefulContainerChildPropsT, StatefulCheckboxPropsT } from "./types";
// Styled elements

const StatefulCheckbox = function (props: StatefulCheckboxPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: StatefulContainerChildPropsT) => {
        return <Checkbox {...childrenProps}>{props.children}</Checkbox>;
      }}
    </StatefulContainer>
  );
};
StatefulCheckbox.displayName = "StatefulCheckbox";
export default StatefulCheckbox;
