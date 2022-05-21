import * as React from "react";
// eslint-disable-next-line import/no-named-default
import { default as StatefulContainer } from "./stateful-checkbox-container.js";
// eslint-disable-next-line import/no-named-default
import { default as Checkbox } from "./checkbox.js";
import type { StatefulContainerChildPropsT, StatefulCheckboxPropsT } from "./types.js";
// Styled elements

const StatefulCheckbox = function (props: StatefulCheckboxPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: StatefulContainerChildPropsT) => (
        <Checkbox {...childrenProps}>{props.children}</Checkbox>
      )}
    </StatefulContainer>
  );
};
StatefulCheckbox.displayName = "StatefulCheckbox";
export default StatefulCheckbox;
