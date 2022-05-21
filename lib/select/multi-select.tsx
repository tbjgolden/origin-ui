import SelectComponent from "./select-component";
import MultiValue from "./multi-value";
function MultiSelect(props) {
  return <SelectComponent {...props} multi={true} valueComponent={MultiValue} />;
}
export default MultiSelect;
