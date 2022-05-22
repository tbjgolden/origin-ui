import { useStyletron } from "../styles";
import Column from "./column";
import { COLUMNS } from "./constants";
function RowIndexFilter() {
  return <div>not implemented for row index column</div>;
}
function RowIndexCell(props) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
      })}
    >
      {props.y + 1}
    </div>
  );
}
function RowIndexColumn() {
  return Column({
    kind: COLUMNS.ROW_INDEX,
    buildFilter: () => {
      return () => {
        return true;
      };
    },
    cellBlockAlign: "start",
    fillWidth: false,
    filterable: false,
    mapDataToValue: () => {
      return null;
    },
    renderCell: RowIndexCell,
    renderFilter: RowIndexFilter,
    sortable: false,
    sortFn: () => {
      return 0;
    },
    title: "",
  });
}
export default RowIndexColumn;
