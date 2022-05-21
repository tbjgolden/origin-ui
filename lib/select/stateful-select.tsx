import * as React from "react";
import StatefulContainer from "./stateful-select-container.js";
import Select from "./select.js";
import defaultProps from "./default-props.js";
import type { PropsT, StatefulSelectPropsT } from "./types.js";

export default function StatefulSelect(props: StatefulSelectPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => <Select {...childrenProps} />}
    </StatefulContainer>
  );
}

StatefulSelect.defaultProps = defaultProps;
