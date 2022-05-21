
import * as React from "react";
import StatefulContainer from "./stateful-container.js";
import Input from "./input.js";
import type { InputPropsT, StatefulInputPropsT } from "./types.js";

export default function StatefulInput(props: StatefulInputPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: InputPropsT) => <Input {...childrenProps} />}
    </StatefulContainer>
  );
}
