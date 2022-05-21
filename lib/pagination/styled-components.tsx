import { styled } from "../styles";
export const StyledRoot = styled("div", ({ $theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    color: $theme.colors.backgroundInversePrimary,
    ...$theme.typography.font350,
  };
});
export const StyledMaxLabel = styled("span", ({ $theme }) => {
  const marginStartDir = $theme.direction === "rtl" ? "marginRight" : "marginLeft";
  const marginEndDir = $theme.direction === "rtl" ? "marginLeft" : "marginRight";
  return {
    [marginStartDir]: $theme.sizing.scale300,
    [marginEndDir]: $theme.sizing.scale600,
  };
});
export const StyledDropdownContainer = styled("div", ({ $theme, $isFocusVisible }) => {
  const marginStartDir = $theme.direction === "rtl" ? "marginRight" : "marginLeft";
  const marginEndDir = $theme.direction === "rtl" ? "marginLeft" : "marginRight";
  return {
    position: "relative",
    outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : "none",
    [marginStartDir]: $theme.sizing.scale600,
    [marginEndDir]: $theme.sizing.scale300,
  };
});
