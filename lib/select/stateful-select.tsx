import * as React from "react";
import StatefulContainer from "./stateful-select-container";
import Select from "./select";
import defaultProps from "./default-props";
import type { PropsT, StatefulSelectPropsT } from "./types";

export default function StatefulSelect(props: StatefulSelectPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => {
        return <Select {...childrenProps} />;
      }}
    </StatefulContainer>
  );
}

StatefulSelect.defaultProps = defaultProps;
