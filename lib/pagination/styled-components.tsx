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
  return {
    marginLeft: $theme.sizing.scale300,
    marginRight: $theme.sizing.scale600,
  };
});
export const StyledDropdownContainer = styled("div", ({ $theme, $isFocusVisible }) => {
  return {
    position: "relative",
    outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : "none",
    marginLeft: $theme.sizing.scale600,
    marginRight: $theme.sizing.scale300,
  };
});
