import * as React from "react";
import SelectComponent from "./select-component";
import Value from "./value";
import type { PropsT } from "./types";

function MultiSelect(props: $Shape<PropsT>) {
  return <SelectComponent {...props} multi={false} valueComponent={Value} />;
}

export default MultiSelect;
