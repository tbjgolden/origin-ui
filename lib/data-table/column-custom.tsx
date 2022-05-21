import Column from "./column";
import { COLUMNS } from "./constants";
function CustomColumn(options) {
  return Column({ kind: COLUMNS.CUSTOM, ...options });
}
export default CustomColumn;
