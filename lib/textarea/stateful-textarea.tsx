import * as React from "react";
import StatefulContainer from "./stateful-container.js";
import Textarea from "./textarea.js";
import type { StatefulTextareaPropsT, TextareaPropsT } from "./types.js";

export default function StatefulTextarea(props: StatefulTextareaPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: TextareaPropsT) => <Textarea {...childrenProps} />}
    </StatefulContainer>
  );
}
