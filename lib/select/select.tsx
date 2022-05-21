
import * as React from "react";
import SelectComponent from "./select-component.js";
import MultiValue from "./multi-value.js";
import SingleValue from "./value.js";

function Select(props: React.ElementConfig<typeof SelectComponent>) {
  return (
    <SelectComponent {...props} valueComponent={props.multi ? MultiValue : SingleValue} />
  );
}

export default Select;
