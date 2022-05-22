import { styled } from "../styles";
export const Link = styled("a", ({ $theme, $isAnimateUnderline, $isFocusVisible }) => {
  const { colors, typography, animation, direction } = $theme;
  return {
    color: colors.linkText,
    ...typography.font350,
    fontSize: "inherit",
    lineHeight: "inherit",
    transitionProperty: !$isAnimateUnderline ? "backgroundSize" : "",
    transitionDuration: animation.timing500,
    transitionTimingFunction: animation.easeOutQuinticCurve,
    position: $isAnimateUnderline ? "relative" : null,
    textDecoration: $isAnimateUnderline ? "none" : "underline",
    textUnderlinePosition: "under",
    willChange: "background-size",
    backgroundSize: "0% 100%, 100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: $isAnimateUnderline
      ? `linear-gradient(transparent calc(100% - 1px), ${colors.linkHover} 1px), linear-gradient(transparent calc(100% - 1px), ${colors.linkText} 1px)`
      : "none",
    ":hover": {
      color: colors.linkHover,
      backgroundSize: "100% 100%, 100% 100%",
    },
    ":focus": {
      outline: $isFocusVisible ? `3px solid ${colors.accent}` : "none",
      outlineOffset: "1px",
      textDecoration: "none",
    },
    ":visited": {
      color: colors.linkVisited,
    },
    ":active": {
      color: colors.linkActive,
    },
  };
});
