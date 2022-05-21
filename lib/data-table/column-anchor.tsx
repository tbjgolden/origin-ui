import { StyledLink } from "../link";
import { useStyletron } from "../styles";
import Column from "./column";
import { COLUMNS } from "./constants";
function AnchorFilter(props) {
  return <div>not implemented for anchor column</div>;
}
function AnchorCell(props) {
  const [css] = useStyletron();
  return <div className={css({
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  })}><StyledLink $as={props.elementAs} href={props.value.href}>{props.value.content}</StyledLink></div>;
}
function AnchorColumn(options) {
  return Column({
    kind: COLUMNS.ANCHOR,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: false,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderAnchorCell(props) {
      return <AnchorCell {...props} elementAs={options.elementAs} />;
    },
    renderFilter: AnchorFilter,
    sortable: options.sortable === void 0 ? true : options.sortable,
    sortFn: function(a, b) {
      return a.content.localeCompare(b.content);
    },
    title: options.title
  });
}
export default AnchorColumn;
