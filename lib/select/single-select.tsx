
import * as React from "react";
import SelectComponent from "./select-component.js";
import Value from "./value.js";
import type { PropsT } from "./types.js";

function MultiSelect(props: $Shape<PropsT>) {
  return <SelectComponent {...props} multi={false} valueComponent={Value} />;
}

export default MultiSelect;
