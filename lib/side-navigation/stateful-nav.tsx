import * as React from "react";
import StatefulContainer from "./stateful-container";
import Navigation from "./nav";
import type { StatefulNavPropsT } from "./types";

export default function StatefulNavigation(props: StatefulNavPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps) => {
        return <Navigation {...childrenProps} />;
      }}
    </StatefulContainer>
  );
}
