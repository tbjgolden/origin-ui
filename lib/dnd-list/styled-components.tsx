import { styled } from "../styles";
export const Root = styled("div", ({ $theme }) => {
  return {
    width: "100%",
  };
});
Root.displayName = "StyledRoot";
export const List = styled("ul", ({ $isDragged }) => {
  return {
    paddingLeft: 0,
    cursor: $isDragged ? "grabbing" : null,
    pointerEvents: $isDragged ? "none" : "auto",
  };
});
List.displayName = "StyledList";
export const Item = styled(
  "li",
  ({ $isDragged, $isSelected, $theme, $isFocusVisible }) => {
    return {
      ":hover":
        !$isDragged && !$isSelected
          ? {
              borderTopWidth: "2px",
              borderBottomWidth: "2px",
              borderLeftWidth: "2px",
              borderRightWidth: "2px",
              borderTopStyle: "solid",
              borderBottomStyle: "solid",
              borderLeftStyle: "solid",
              borderRightStyle: "solid",
              borderTopColor: $theme.colors.primary,
              borderBottomColor: $theme.colors.primary,
              borderLeftColor: $theme.colors.primary,
              borderRightColor: $theme.colors.primary,
            }
          : {},
      ":focus": {
        outline:
          $isFocusVisible && !$isDragged && !$isSelected
            ? `3px solid ${$theme.colors.accent}`
            : "none",
        outlineOffset: "-3px",
      },
      paddingTop: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale600,
      paddingLeft: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      color: $theme.colors.contentPrimary,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      listStyle: "none",
      cursor: $isDragged ? "grabbing" : "grab",
      backgroundColor: $theme.colors.backgroundPrimary,
      boxShadow: $isDragged ? "0 2px 6px rgba(0, 0, 0, 0.32)" : null,
      borderTopWidth: "2px",
      borderBottomWidth: "2px",
      borderLeftWidth: "2px",
      borderRightWidth: "2px",
      borderTopStyle: "solid",
      borderBottomStyle: "solid",
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
      borderTopColor: $isDragged || $isSelected ? $theme.colors.primary : "transparent",
      borderBottomColor:
        $isDragged || $isSelected ? $theme.colors.primary : "transparent",
      borderLeftColor: $isDragged || $isSelected ? $theme.colors.primary : "transparent",
      borderRightColor: $isDragged || $isSelected ? $theme.colors.primary : "transparent",
    };
  }
);
List.displayName = "StyledItem";
export const DragHandle = styled("div", ({ $theme }) => {
  return {
    marginRight: $theme.sizing.scale600,
    width: $theme.sizing.scale800,
    color: "#CCC",
    display: "flex",
    alignItems: "center",
  };
});
DragHandle.displayName = "StyledDragHandle";
export const CloseHandle = styled("button", ({ $theme, $isFocusVisible }) => {
  return {
    borderLeftStyle: "none",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    overflow: "visible",
    cursor: "pointer",
    backgroundColor: "transparent",
    marginLeft: $theme.sizing.scale600,
    width: $theme.sizing.scale800,
    display: "flex",
    alignItems: "center",
    ":focus": {
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : "none",
    },
  };
});
CloseHandle.displayName = "StyledCloseHandle";
export const Label = styled("div", ({ $theme }) => {
  return {
    flexGrow: 1,
    ...$theme.typography.font300,
  };
});
Label.displayName = "StyledLabel";
