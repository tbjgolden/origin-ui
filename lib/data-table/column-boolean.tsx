import React from "react";
import { useStyletron } from "../styles";
import { CategoricalFilter } from "./column-categorical";
import Column from "./column";
import { COLUMNS } from "./constants";
import { LocaleContext } from "../locale";
function mapSelection(selection, transform) {
  const coercedSelection = /* @__PURE__ */ new Set();
  for (const item of selection) coercedSelection.add(transform(item));
  return coercedSelection;
}
function BooleanFilter(props) {
  const locale = React.useContext(LocaleContext);
  let selectionString = /* @__PURE__ */ new Set();
  if (props.filterParams && props.filterParams.selection) {
    selectionString = mapSelection(props.filterParams.selection, (i) => {
      return i ? locale.datatable.booleanFilterTrue : locale.datatable.booleanFilterFalse;
    });
  }
  return (
    <CategoricalFilter
      close={props.close}
      data={[locale.datatable.booleanFilterTrue, locale.datatable.booleanFilterFalse]}
      filterParams={
        props.filterParams
          ? {
              selection: selectionString,
              description: props.filterParams.description,
              exclude: props.filterParams.exclude,
            }
          : void 0
      }
      setFilter={(params) => {
        props.setFilter({
          selection: mapSelection(params.selection, (i) => {
            return i === locale.datatable.booleanFilterTrue;
          }),
          exclude: params.exclude,
          description: params.description,
        });
      }}
    />
  );
}
function BooleanCell(props) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  return (
    <div
      className={css({
        textAlign: props.value ? "right" : "left",
        minWidth: theme.sizing.scale1400,
        width: "100%",
      })}
    >
      {props.value
        ? locale.datatable.booleanColumnTrueShort
        : locale.datatable.booleanColumnFalseShort}
    </div>
  );
}
function BooleanColumn(options) {
  return Column({
    kind: COLUMNS.BOOLEAN,
    buildFilter: function (params) {
      return function (data) {
        const included = params.selection.has(data);
        return params.exclude ? !included : included;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: options.filterable === void 0 ? true : options.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: BooleanCell,
    renderFilter: BooleanFilter,
    sortable: options.sortable === void 0 ? true : options.sortable,
    sortFn: function (a, b) {
      if (a === b) return 0;
      return a ? -1 : 1;
    },
    title: options.title,
  });
}
export default BooleanColumn;
