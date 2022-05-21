import StatefulContainer from "./stateful-select-container";
import Select from "./select";
import defaultProps from "./default-props";
export default function StatefulSelect(props) {
  return <StatefulContainer {...props}>{(childrenProps) => {
    return <Select {...childrenProps} />;
  }}</StatefulContainer>;
}
StatefulSelect.defaultProps = defaultProps;
