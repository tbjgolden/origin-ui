import { default as StatefulContainer } from "./stateful-checkbox-container";
import { default as Checkbox } from "./checkbox";
const StatefulCheckbox = function(props) {
  return <StatefulContainer {...props}>{(childrenProps) => {
    return <Checkbox {...childrenProps}>{props.children}</Checkbox>;
  }}</StatefulContainer>;
};
StatefulCheckbox.displayName = "StatefulCheckbox";
export default StatefulCheckbox;
