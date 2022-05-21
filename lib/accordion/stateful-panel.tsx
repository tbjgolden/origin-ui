import * as React from "react";
import StatefulContainer from "./stateful-panel-container";
import Panel from "./panel";
import type { StatefulPanelPropsT } from "./types";

export default function StatefulPanel(props: StatefulPanelPropsT) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(componentProps) => {
        return <Panel {...componentProps}>{children}</Panel>;
      }}
    </StatefulContainer>
  );
}
