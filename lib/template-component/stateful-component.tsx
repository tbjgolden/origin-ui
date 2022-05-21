import * as React from "react";
import StatefulContainer from "./stateful-container";
import Component from "./component";
import type { StatefulComponentPropsT } from "./types";

function StatefulComponent(props: StatefulComponentPropsT) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(componentProps) => {
        return <Component {...componentProps}>{children}</Component>;
      }}
    </StatefulContainer>
  );
}

StatefulComponent.defaultProps = StatefulContainer.defaultProps;

export default StatefulComponent;
