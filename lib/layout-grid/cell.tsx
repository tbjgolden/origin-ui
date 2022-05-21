import React from "react";
import { getOverrides } from "../helpers/overrides";
import { StyledCell as DefaultStyledCell } from "./styled-components";
import { GridContext } from "./grid";
export default function Cell({
  align,
  children,
  gridColumns,
  gridGaps,
  gridGutters,
  gridUnit,
  order,
  skip,
  span,
  overrides = {},
}) {
  const [StyledCell, overrideProps] = getOverrides(overrides.Cell, DefaultStyledCell);
  const gridContext = React.useContext(GridContext);
  return (
    <StyledCell
      $align={align}
      $gridColumns={gridColumns || gridContext.gridColumns}
      $gridGaps={gridGaps || gridContext.gridGaps}
      $gridGutters={gridGutters || gridContext.gridGutters}
      $gridUnit={gridUnit || gridContext.gridUnit}
      $order={order}
      $skip={skip}
      $span={span}
      {...overrideProps}
    >
      {children}
    </StyledCell>
  );
}
