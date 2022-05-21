import React from "react";
import { useStyletron } from "../styles";
import HeaderCell from "./header-cell";
import { useRef } from "react";
function MeasureColumn({
  sampleIndexes,
  column,
  columnIndex,
  rows,
  isSelectable,
  onLayout,
}) {
  const [css] = useStyletron();
  const ref = useRef();
  React.useEffect(() => {
    if (__BROWSER__ && ref.current) {
      onLayout(columnIndex, ref.current.getBoundingClientRect());
    }
  }, []);
  return (
    <div
      ref={ref}
      className={css({
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
      })}
    >
      <HeaderCell
        index={columnIndex}
        isHovered
        isMeasured
        isSelectedAll={false}
        isSelectedIndeterminate={false}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        onSelectAll={() => {}}
        onSelectNone={() => {}}
        onSort={(i) => {}}
        sortable={column.sortable}
        sortDirection={null}
        title={column.title}
        isSelectable={isSelectable}
      />
      {sampleIndexes.map((rowIndex, i) => {
        const Cell = column.renderCell;
        return (
          <Cell
            key={`measure-${i}`}
            value={column.mapDataToValue(rows[rowIndex].data)}
            isSelectable={isSelectable}
            isMeasured
            sortable={column.sortable}
            x={0}
            y={rowIndex}
          />
        );
      })}
    </div>
  );
}
const MAX_SAMPLE_SIZE = 50;
function generateSampleIndices(inputMin, inputMax, maxSamples) {
  const indices = [];
  const queue = [[inputMin, inputMax]];
  while (queue.length > 0) {
    const [min, max] = queue.shift();
    if (indices.length < maxSamples) {
      const pivot = Math.floor((min + max) / 2);
      indices.push(pivot);
      const left = pivot - 1;
      const right = pivot + 1;
      if (left >= min) {
        queue.push([min, left]);
      }
      if (right <= max) {
        queue.push([right, max]);
      }
    }
  }
  return indices;
}
export default function MeasureColumnWidths({
  columns,
  rows,
  widths,
  isSelectable,
  onWidthsChange,
}) {
  const [css] = useStyletron();
  const widthMap = React.useMemo(() => {
    return /* @__PURE__ */ new Map();
  }, []);
  const sampleSize = rows.length < MAX_SAMPLE_SIZE ? rows.length : MAX_SAMPLE_SIZE;
  const finishedMeasurementCount = (sampleSize + 1) * columns.length;
  const sampleIndexes = React.useMemo(() => {
    return generateSampleIndices(0, rows.length - 1, sampleSize);
  }, [columns, rows, widths, sampleSize]);
  const handleDimensionsChange = React.useCallback(
    (columnIndex, dimensions) => {
      const nextWidth = Math.min(
        Math.max(
          columns[columnIndex].minWidth || 0,
          widthMap.get(columnIndex) || 0,
          dimensions.width + 1
        ),
        columns[columnIndex].maxWidth || Number.POSITIVE_INFINITY
      );
      if (nextWidth !== widthMap.get(columnIndex)) {
        widthMap.set(columnIndex, nextWidth);
      }
      if (
        widthMap.size === columns.length ||
        widthMap.size === Math.floor(columns.length / 2) ||
        widthMap.size === Math.floor(columns.length / 4)
      ) {
        onWidthsChange([...widthMap.values()]);
      }
    },
    [columns, finishedMeasurementCount, onWidthsChange]
  );
  const hiddenStyle = css({
    position: "absolute",
    overflow: "hidden",
    height: 0,
  });
  if (widthMap.size === columns.length) {
    return null;
  }
  return (
    <div className={hiddenStyle} aria-hidden role="none">
      {columns.map((column, i) => {
        return (
          <MeasureColumn
            key={column.title + i}
            column={column}
            rows={rows}
            isSelectable={isSelectable}
            onLayout={handleDimensionsChange}
            columnIndex={i}
            sampleIndexes={sampleIndexes}
          />
        );
      })}
    </div>
  );
}
