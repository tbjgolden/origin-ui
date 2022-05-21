import * as React from "react";
import SelectComponent from "./select-component.js";
import MultiValue from "./multi-value.js";
import type { PropsT } from "./types.js";

function MultiSelect(props: $Shape<PropsT>) {
  return <SelectComponent {...props} multi={true} valueComponent={MultiValue} />;
}

export default MultiSelect;
