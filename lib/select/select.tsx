import SelectComponent from "./select-component";
import MultiValue from "./multi-value";
import SingleValue from "./value";
function Select(props) {
  return (
    <SelectComponent {...props} valueComponent={props.multi ? MultiValue : SingleValue} />
  );
}
export default Select;
