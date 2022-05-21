import * as React from "react";
import StatefulContainer from "./stateful-container";
import Input from "./input";
import type { InputPropsT, StatefulInputPropsT } from "./types";

export default function StatefulInput(props: StatefulInputPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: InputPropsT) => {
        return <Input {...childrenProps} />;
      }}
    </StatefulContainer>
  );
}
