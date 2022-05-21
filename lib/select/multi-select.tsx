import * as React from "react";
import SelectComponent from "./select-component";
import MultiValue from "./multi-value";
import type { PropsT } from "./types";

function MultiSelect(props: $Shape<PropsT>) {
  return <SelectComponent {...props} multi={true} valueComponent={MultiValue} />;
}

export default MultiSelect;
