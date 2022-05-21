import StatefulContainer from "./stateful-radiogroup-container";
import RadioGroup from "./radiogroup";
const StatefulRadioGroup = function(props) {
  const { children, ...restProps } = props;
  return <StatefulContainer {...restProps}>{(childrenProps) => {
    return <RadioGroup {...childrenProps}>{children}</RadioGroup>;
  }}</StatefulContainer>;
};
StatefulRadioGroup.displayName = "StatefulRadioGroup";
export default StatefulRadioGroup;
