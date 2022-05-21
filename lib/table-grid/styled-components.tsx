import { withStyle, withWrapper } from "../styles";
import {
  StyledTable as FlexStyledTable,
  StyledHeadCell as FlexStyledHeadCell,
  StyledCell as FlexStyledBodyCell
} from "../table";
const StyledTableElement = withStyle(FlexStyledTable, (props) => {
  return {
    display: "grid",
    gridTemplateColumns: props.$gridTemplateColumns,
    flexDirection: "unset",
    transform: "scale(1)"
  };
});
export const StyledTable = withWrapper(StyledTableElement, (StyledComponent) => {
  return function StyledTable2(props) {
    return <StyledComponent data-baseweb="table-grid" {...props} />;
  };
});
export const StyledHeadCell = withStyle(FlexStyledHeadCell, ({ $sticky = true, $isFocusVisible, $theme }) => {
  return {
    backgroundColor: $theme.colors.tableHeadBackgroundColor,
    boxShadow: $theme.lighting.shadow400,
    position: $sticky ? "sticky" : null,
    top: $sticky ? 0 : null,
    width: "unset",
    ":focus": {
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : "none",
      outlineOffset: "-3px"
    },
    zIndex: $sticky ? 1 : "auto"
  };
});
export const StyledBodyCell = withStyle(FlexStyledBodyCell, (props) => {
  return {
    display: "block",
    flex: "unset",
    gridColumn: props.$gridColumn || null,
    gridRow: props.$gridRow || null,
    ":focus": {
      outline: props.$isFocusVisible ? `3px solid ${props.$theme.colors.accent}` : "none",
      outlineOffset: "-3px"
    }
  };
});
