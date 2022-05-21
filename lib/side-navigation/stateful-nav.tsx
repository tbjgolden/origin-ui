
import * as React from "react";
import StatefulContainer from "./stateful-container.js";
import Navigation from "./nav.js";
import type { StatefulNavPropsT } from "./types.js";

export default function StatefulNavigation(props: StatefulNavPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps) => <Navigation {...childrenProps} />}
    </StatefulContainer>
  );
}
