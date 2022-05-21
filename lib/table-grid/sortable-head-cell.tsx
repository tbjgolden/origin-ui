import { SortableHeadCellFactory } from "../table/index.js";
import { StyledHeadCell } from "./styled-components.js";

export const SortableHeadCell = SortableHeadCellFactory(StyledHeadCell);
