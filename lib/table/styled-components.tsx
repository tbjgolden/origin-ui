import { styled, withWrapper, expandBorderStyles } from "../styles";
const StyledTableElement = styled("div", ({ $theme }) => {
  return {
    ...expandBorderStyles($theme.borders.border300),
    backgroundColor: $theme.colors.tableBackground,
    borderTopLeftRadius: $theme.borders.radius200,
    borderTopRightRadius: $theme.borders.radius200,
    borderBottomRightRadius: $theme.borders.radius200,
    borderBottomLeftRadius: $theme.borders.radius200,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowX: "auto",
  };
});
export const StyledTable = withWrapper(StyledTableElement, (StyledComponent) => {
  return function StyledTable2(props) {
    return <StyledComponent data-baseweb="table-custom" role="grid" {...props} />;
  };
});
const StyledHeadElement = styled("div", ({ $theme, $width }) => {
  return {
    backgroundColor: $theme.colors.tableHeadBackgroundColor,
    boxShadow: $theme.lighting.shadow400,
    display: "flex",
    flexGrow: 0,
    width: $width ? $width : "100%",
  };
});
export const StyledHead = withWrapper(StyledHeadElement, (StyledComponent) => {
  return function StyledHead2(props) {
    return <StyledComponent role="row" {...props} />;
  };
});
const StyledHeadCellElement = styled("div", ({ $theme, $cursor }) => {
  return {
    ...$theme.typography.font350,
    ...expandBorderStyles($theme.borders.border300),
    borderTopStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    color: $theme.colors.contentPrimary,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: $theme.sizing.scale500,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale500,
    paddingLeft: $theme.sizing.scale600,
    cursor: $cursor ? $cursor : "inherit",
    width: "100%",
    ":last-of-type": {
      borderRight: "none",
    },
  };
});
export const StyledHeadCell = withWrapper(StyledHeadCellElement, (StyledComponent) => {
  return function StyledHeadCell2(props) {
    return <StyledComponent role="columnheader" {...props} />;
  };
});
export const StyledSortableLabel = styled("button", ({ $theme }) => {
  return {
    ...$theme.typography.font250,
    alignItems: "center",
    backgroundColor: "transparent",
    borderLeftStyle: "none",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    color: $theme.colors.contentPrimary,
    display: "flex",
    padding: 0,
    ":hover:enabled": {
      cursor: "pointer",
    },
    ":disabled": {
      color: $theme.colors.mono500,
    },
  };
});
const StyledBodyElement = styled("div", ({ $width }) => {
  return {
    width: $width ? $width : "100%",
    overflowX: "hidden",
    overflowY: "overlay",
    flex: 1,
  };
});
export const StyledBody = withWrapper(StyledBodyElement, (StyledComponent) => {
  return function StyledBody2(props) {
    return <StyledComponent role="rowgroup" {...props} />;
  };
});
const StyledRowElement = styled("div", {
  display: "flex",
  alignItems: "center",
});
export const StyledRow = withWrapper(StyledRowElement, (StyledComponent) => {
  return function StyledRow2(props) {
    return <StyledComponent role="row" {...props} />;
  };
});
const StyledCellElement = styled("div", ({ $theme, $striped }) => {
  return {
    ...$theme.typography.font200,
    backgroundColor: $striped ? $theme.colors.tableStripedBackground : null,
    color: $theme.colors.contentPrimary,
    display: "flex",
    flex: 1,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale300,
    paddingLeft: $theme.sizing.scale600,
  };
});
export const StyledCell = withWrapper(StyledCellElement, (StyledComponent) => {
  return function StyledCell2(props) {
    return <StyledComponent role="gridcell" {...props} />;
  };
});
export const StyledFilterButton = styled("button", (props) => {
  function getIconColor() {
    if (props.$disabled) {
      return props.$theme.colors.mono500;
    }
    if (props.$active) {
      return props.$theme.colors.contentPrimary;
    }
    return props.$theme.colors.tableFilter;
  }
  function getIconHoverColor() {
    if (props.$disabled || props.$active) {
      return null;
    }
    return props.$theme.colors.contentPrimary;
  }
  return {
    backgroundColor: "transparent",
    borderLeftStyle: "none",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    color: getIconColor(),
    cursor: props.$disabled ? null : "pointer",
    paddingTop: "none",
    paddingRight: "none",
    paddingBottom: "none",
    paddingLeft: "none",
    ":hover": {
      color: getIconHoverColor(),
    },
  };
});
export const StyledFilterContent = styled("div", ({ $theme }) => {
  return {
    ...expandBorderStyles($theme.borders.border300),
    backgroundColor: $theme.colors.tableFilterBackground,
    borderRightStyle: "none",
    borderLeftStyle: "none",
    maxHeight: "196px",
    paddingRight: $theme.sizing.scale600,
    paddingLeft: $theme.sizing.scale600,
    overflow: "auto",
  };
});
export const StyledFilterHeading = styled("div", ({ $theme }) => {
  return {
    ...$theme.typography.font250,
    color: $theme.colors.tableFilterHeading,
    paddingTop: $theme.sizing.scale500,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale500,
    paddingLeft: $theme.sizing.scale600,
  };
});
export const StyledFilterFooter = styled("div", ({ $theme }) => {
  return {
    backgroundColor: $theme.colors.tableFilterFooterBackground,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale100,
    paddingBottom: $theme.sizing.scale300,
    paddingLeft: $theme.sizing.scale100,
    display: "flex",
    justifyContent: "space-between",
    minWidth: "216px",
  };
});
export const StyledAction = styled("button", ({ $theme }) => {
  return {
    backgroundColor: "transparent",
    borderLeftStyle: "none",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    color: $theme.colors.primary,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginRight: $theme.sizing.scale100,
    marginLeft: $theme.sizing.scale100,
    ":hover:enabled": {
      cursor: "pointer",
    },
  };
});
