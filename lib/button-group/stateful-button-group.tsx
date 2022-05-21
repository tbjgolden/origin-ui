import * as React from "react";

import ButtonGroup from "./button-group";
import StatefulContainer from "./stateful-container";
import type { StatefulPropsT } from "./types";

export default function StatefulButtonGroup(props: StatefulPropsT) {
  const { children, initialState, ...restProps } = props;
  return (
    <StatefulContainer initialState={initialState} {...restProps}>
      {({ ...containerProps }) => {
        return (
          //$FlowFixMe
          <ButtonGroup {...containerProps}>{props.children}</ButtonGroup>
        );
      }}
    </StatefulContainer>
  );
}
