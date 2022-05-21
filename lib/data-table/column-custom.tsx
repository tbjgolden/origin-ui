import Column from "./column";
import { COLUMNS } from "./constants";
import type { ColumnT, RenderCellT, RenderFilterT, SharedColumnOptionsT } from "./types";

// I could not re-use the ColumnT type to build this.. tried to spread the ColumnT
// and define renderFilter, etc. to optional, but required status was maintained.
type OptionsT<ValueT, FilterParamsT> = SharedColumnOptionsT<ValueT> & {
  renderCell: RenderCellT<ValueT>;
  renderFilter?: RenderFilterT<ValueT, FilterParamsT>;
  buildFilter?: (FilterParamsT) => (ValueT) => boolean;
  textQueryFilter?: (string, ValueT) => boolean;
  sortFn?: (ValueT, ValueT) => number;
};

function CustomColumn<ValueT, FilterParamsT>(
  options: OptionsT<ValueT, FilterParamsT>
): ColumnT<ValueT, FilterParamsT> {
  //$FlowFixMe
  return Column({ kind: COLUMNS.CUSTOM, ...options });
}

export default CustomColumn;
