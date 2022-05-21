import * as React from "react";

import { useStyletron } from "../styles";

import Column from "./column";
import { COLUMNS } from "./constants";
import type { ColumnT } from "./types";

type ValueT = null;
type FilterParametersT = {};

type RowIndexColumnT = ColumnT<ValueT, FilterParametersT>;

function RowIndexFilter() {
  return <div>not implemented for row index column</div>;
}

function RowIndexCell(props) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: theme.direction !== "rtl" ? "flex-end" : "flex-start",
        width: "100%",
      })}
    >
      {props.y + 1}
    </div>
  );
}

function RowIndexColumn(): RowIndexColumnT {
  return Column({
    kind: COLUMNS.ROW_INDEX,
    buildFilter: () => {
      return () => {
        return true;
      };
    },
    cellBlockAlign: "start", // how to configure?
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
