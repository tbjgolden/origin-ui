import { StyledGrid, StyledCell } from "./styled-components";
import Grid from "./grid";
import Cell from "./cell";

import DeprecatedHOC from "../utils/deprecated-component";

export * from "./constants";

const componentName = "Layout Grid (baseui/layout-grid)";
export const Unstable_StyledGrid = DeprecatedHOC(StyledGrid, componentName);
export const Unstable_StyledCell = DeprecatedHOC(StyledCell, componentName);
export const Unstable_Grid = DeprecatedHOC(Grid, componentName);
export const Unstable_Cell = DeprecatedHOC(Cell, componentName);

export { StyledGrid, StyledCell } from "./styled-components";
export { default as Grid } from "./grid";
export { default as Cell } from "./cell";
