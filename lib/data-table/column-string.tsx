import { useStyletron } from "../styles";
import Column from "./column";
import { COLUMNS } from "./constants";
import { HighlightCellText } from "./text-search";
function StringFilter(props) {
  return <div>not implemented for string column</div>;
}
function StringCell(props) {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "-webkit-box",
        WebkitLineClamp: props.lineClamp || 1,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      })}
    >
      {props.textQuery ? (
        <HighlightCellText text={props.value} query={props.textQuery} />
      ) : (
        props.value
      )}
    </div>
  );
}
function StringColumn(options) {
  return Column({
    kind: COLUMNS.STRING,
    cellBlockAlign: options.cellBlockAlign,
    buildFilter: function (params) {
      return function (data) {
        return true;
      };
    },
    fillWidth: options.fillWidth,
    filterable: false,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderStringCell(props) {
      return <StringCell {...props} lineClamp={options.lineClamp} />;
    },
    renderFilter: StringFilter,
    sortable: options.sortable === void 0 ? true : options.sortable,
    sortFn: function (a, b) {
      return a.localeCompare(b);
    },
    textQueryFilter: function (textQuery, data) {
      return data.toLowerCase().includes(textQuery.toLowerCase());
    },
    title: options.title,
  });
}
export default StringColumn;
