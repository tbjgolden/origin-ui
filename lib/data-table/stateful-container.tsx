import * as React from "react";
import { SORT_DIRECTIONS } from "./constants";
function useDuplicateColumnTitleWarning(columns) {
  React.useEffect(() => {
    if (__DEV__) {
      const titles = columns.reduce((set, column) => {
        return set.add(column.title);
      }, /* @__PURE__ */ new Set());
      if (titles.size < columns.length) {
        console.warn("BaseWeb DataTable: Column titles must be unique else will result in non-deterministic filtering.");
      }
    }
  }, [columns]);
}
function useSortParameters(initialSortIndex = -1, initialSortDirection = null) {
  const [sortIndex, setSortIndex] = React.useState(initialSortIndex);
  const [sortDirection, setSortDirection] = React.useState(initialSortDirection);
  function handleSort(columnIndex) {
    if (columnIndex === sortIndex) {
      if (sortDirection === SORT_DIRECTIONS.DESC) {
        setSortIndex(-1);
        setSortDirection(SORT_DIRECTIONS.ASC);
      } else {
        setSortDirection(SORT_DIRECTIONS.DESC);
      }
    } else {
      setSortIndex(columnIndex);
      setSortDirection(SORT_DIRECTIONS.ASC);
    }
  }
  return [sortIndex, sortDirection, handleSort];
}
export function StatefulContainer(props) {
  useDuplicateColumnTitleWarning(props.columns);
  const [sortIndex, sortDirection, handleSort] = useSortParameters(props.initialSortIndex, props.initialSortDirection);
  const [filters, setFilters] = React.useState(props.initialFilters || /* @__PURE__ */ new Map());
  const [textQuery, setTextQuery] = React.useState("");
  function handleFilterAdd(title, filterParams) {
    filters.set(title, filterParams);
    if (props.onFilterAdd) {
      props.onFilterAdd(title, filterParams);
    }
    setFilters(new Map(filters));
  }
  function handleFilterRemove(title) {
    filters.delete(title);
    if (props.onFilterRemove) {
      props.onFilterRemove(title);
    }
    setFilters(new Map(filters));
  }
  const [selectedRowIds, setSelectedRowIds] = React.useState(props.initialSelectedRowIds || /* @__PURE__ */ new Set());
  function handleSelectChange(next) {
    setSelectedRowIds(next);
    const selectionCallback = props.onSelectionChange;
    if (selectionCallback) {
      selectionCallback(props.rows.filter((r) => {
        return next.has(r.id);
      }));
    }
  }
  function handleSelectMany(incomingRows) {
    handleSelectChange(/* @__PURE__ */ new Set([
      ...selectedRowIds,
      ...incomingRows.map((r) => {
        return r.id;
      })
    ]));
  }
  function handleSelectNone() {
    handleSelectChange(/* @__PURE__ */ new Set());
  }
  function handleSelectOne(row) {
    if (selectedRowIds.has(row.id)) {
      selectedRowIds.delete(row.id);
    } else {
      selectedRowIds.add(row.id);
    }
    handleSelectChange(new Set(selectedRowIds));
  }
  const handleIncludedRowsChange = React.useCallback((rows) => {
    if (props.onIncludedRowsChange) {
      props.onIncludedRowsChange(rows);
    }
  }, [props.onIncludedRowsChange]);
  const handleRowHighlightChange = React.useCallback((rowIndex, row) => {
    if (props.onRowHighlightChange) {
      props.onRowHighlightChange(rowIndex, row);
    }
  }, [props.rowHighlightIndex]);
  return props.children({
    filters,
    onFilterAdd: handleFilterAdd,
    onFilterRemove: handleFilterRemove,
    onIncludedRowsChange: handleIncludedRowsChange,
    onRowHighlightChange: handleRowHighlightChange,
    onSelectMany: handleSelectMany,
    onSelectNone: handleSelectNone,
    onSelectOne: handleSelectOne,
    onSort: handleSort,
    onTextQueryChange: setTextQuery,
    resizableColumnWidths: Boolean(props.resizableColumnWidths),
    rowHighlightIndex: props.rowHighlightIndex,
    selectedRowIds,
    sortIndex,
    sortDirection,
    textQuery
  });
}
