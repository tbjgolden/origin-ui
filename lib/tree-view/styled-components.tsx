import { styled } from "../styles";
export const StyledTreeItemList = styled(
  "ul",
  ({ $theme, $indentGuides, $isChildNode, $expanded = true }) => {
    return {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: $isChildNode ? $theme.sizing.scale550 : 0,
      overflow: "auto",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: $isChildNode ? $theme.sizing.scale200 : 0,
      position: "relative",
      outline: "none",
      display: $expanded ? "block" : "none",
      borderLeft:
        $indentGuides && $isChildNode
          ? `1px solid ${$theme.colors.borderOpaque}`
          : "none",
    };
  }
);
export const StyledTreeItem = styled("li", ({ $theme, $isLeafNode }) => {
  return {
    cursor: $isLeafNode ? "auto" : "pointer",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    overflow: "auto",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    position: "relative",
    outline: "none",
  };
});
export const StyledItemContent = styled(
  "div",
  ({ $theme, $isSelected, $isFocusVisible }) => {
    return {
      ...$theme.typography.font300,
      alignItems: "center",
      boxSizing: "border-box",
      color: $theme.colors.primary,
      display: "flex",
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: $theme.sizing.scale200,
      paddingRight: $theme.sizing.scale200,
      paddingTop: $theme.sizing.scale100,
      paddingBottom: $theme.sizing.scale100,
      outline:
        $isSelected && $isFocusVisible ? `3px solid ${$theme.colors.accent}` : "none",
      outlineOffset: "-3px",
      ":hover": {
        backgroundColor: $theme.colors.mono300,
      },
    };
  }
);
export const StyledIconContainer = styled("div", ({ $theme }) => {
  return {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 0,
    marginRight: $theme.sizing.scale200,
  };
});
export const StyledNoIconContainer = styled("div", ({ $theme }) => {
  return {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 0,
    marginRight: $theme.sizing.scale200,
    width: 0,
    height: "1em",
  };
});
export const StyledLabelInteractable = styled("div", () => {
  return {
    width: "100%",
  };
});
