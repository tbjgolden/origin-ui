

import * as React from "react";

import ButtonGroup from "./button-group.js";
import StatefulContainer from "./stateful-container.js";
import type { StatefulPropsT } from "./types.js";

export default function StatefulButtonGroup(props: StatefulPropsT) {
  const { children, initialState, ...restProps } = props;
  return (
    <StatefulContainer initialState={initialState} {...restProps}>
      {({ ...containerProps }) => (
        //$FlowFixMe
        <ButtonGroup {...containerProps}>{props.children}</ButtonGroup>
      )}
    </StatefulContainer>
  );
}
