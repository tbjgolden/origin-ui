import SelectComponent from "./select-component";
import Value from "./value";
function MultiSelect(props) {
  return <SelectComponent {...props} multi={false} valueComponent={Value} />;
}
export default MultiSelect;
