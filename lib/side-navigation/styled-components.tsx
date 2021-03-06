import { styled, hexToRgb, withWrapper } from "../styles";
export const StyledRoot = styled("nav", (props) => {
  const {
    $theme: { colors, typography },
  } = props;
  return {
    ...typography.font300,
    color: colors.contentPrimary,
    listStyleType: "none",
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };
});
export const StyledNavItemContainer = styled("li", {});
export const StyledNavLink = styled("a", ({ $theme, $isFocusVisible }) => {
  return {
    color: "inherit",
    outline: "none",
    textDecoration: "none",
    ":focus > div": $isFocusVisible
      ? {
          outline: `3px solid ${$theme.colors.accent}`,
          outlineOffset: "-3px",
          borderLeftColor: "transparent",
          borderTopColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
        }
      : { outline: "none" },
  };
});
export const StyledNavItemElement = styled("div", (props) => {
  const {
    $active,
    $selectable,
    $level,
    $disabled,
    $theme: { colors, sizing },
  } = props;
  const bgImgGradient = hexToRgb(colors.backgroundPrimary, "0.92") || "";
  let cursor = $selectable ? "pointer" : "default";
  let color = $active ? colors.primary : null;
  let hoverColor = $selectable ? colors.primary : null;
  if ($disabled) {
    cursor = "not-allowed";
    color = colors.contentSecondary;
    hoverColor = null;
  }
  return {
    backgroundColor: $active ? colors.backgroundInversePrimary : "transparent",
    backgroundImage: $active
      ? `linear-gradient(0deg, ${bgImgGradient}, ${bgImgGradient})`
      : null,
    boxSizing: "border-box",
    borderLeftWidth: "4px",
    borderLeftStyle: "solid",
    borderLeftColor: $active ? colors.primary : "transparent",
    color,
    cursor,
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
    paddingLeft: `calc(${sizing.scale800} * ${$level})`,
    paddingRight: sizing.scale500,
    ":hover": {
      color: hoverColor,
    },
    ":focus": {
      color: $selectable ? colors.primary : null,
    },
  };
});
export const StyledNavItem = withWrapper(StyledNavItemElement, (Styled) => {
  return function StyledNav({ item, ...restProps }) {
    return <Styled {...restProps} />;
  };
});
export const StyledSubNavContainer = styled("ul", {
  listStyleType: "none",
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
});
