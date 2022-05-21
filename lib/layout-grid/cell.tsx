

import React from "react";
import { getOverrides } from "../helpers/overrides.js";
import { StyledCell as DefaultStyledCell } from "./styled-components.js";
import { GridContext } from "./grid.js";
import type { CellPropsT } from "./types.js";

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
}: CellPropsT) {
  const [StyledCell, overrideProps] = getOverrides(overrides.Cell, DefaultStyledCell);
  const gridContext = React.useContext(GridContext);
  return (
    <StyledCell
      $align={align}
      // TODO(v11): Remove the four grid props, get them solely from GridContext
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