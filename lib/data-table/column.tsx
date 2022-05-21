import * as React from "react";
import { Checkbox } from "../checkbox";
import { useStyletron } from "../styles";
function Column(options) {
  return {
    kind: options.kind,
    buildFilter: options.buildFilter || (() => {
      return () => {
        return true;
      };
    }),
    textQueryFilter: options.textQueryFilter,
    fillWidth: options.fillWidth === void 0 ? true : options.fillWidth,
    filterable: Boolean(options.filterable) && Boolean(options.renderFilter) && Boolean(options.buildFilter),
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: React.forwardRef((props, ref) => {
      const [css, theme] = useStyletron();
      const ProvidedCell = options.renderCell;
      let cellBlockAlign = "flex-start";
      if (options.cellBlockAlign === "center") {
        cellBlockAlign = "center";
      } else if (options.cellBlockAlign === "end") {
        cellBlockAlign = "flex-end";
      }
      return <div ref={ref} className={css({
        ...theme.typography.font100,
        boxSizing: "border-box",
        color: theme.colors.contentPrimary,
        display: props.isMeasured ? "inline-block" : null,
        height: "100%",
        paddingTop: theme.sizing.scale300,
        paddingLeft: theme.sizing.scale500,
        paddingBottom: theme.sizing.scale300,
        paddingRight: theme.sizing.scale500,
        width: props.isMeasured ? null : "100%"
      })}><div className={css({
        alignItems: cellBlockAlign,
        display: "flex",
        height: "100%"
      })}>
        {Boolean(props.onSelect) && <span className={css({ paddingRight: theme.sizing.scale300 })}><Checkbox onChange={props.onSelect} checked={props.isSelected} overrides={{
          Checkmark: { style: { marginTop: null, marginBottom: null } }
        }} /></span>}
        <ProvidedCell {...props} />
      </div></div>;
    }),
    renderFilter: options.renderFilter || (() => {
      return null;
    }),
    sortable: Boolean(options.sortable) && Boolean(options.sortFn),
    sortFn: options.sortFn || (() => {
      return 0;
    }),
    title: options.title
  };
}
export default Column;
