import { styled } from "../styles";
function getAnimationColor(props) {
  const { $theme } = props;
  return `linear-gradient(135deg,
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundSecondary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary},
    ${$theme.colors.backgroundTertiary})`;
}
const animationStyle = {
  animationTimingFunction: "ease-out",
  animationDuration: "1.5s",
  animationIterationCount: "infinite",
  backgroundSize: "400% 100%",
  animationName: {
    "0%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
};
export const StyledRoot = styled("div", (props) => {
  if (typeof props.$rows === "number" && props.$rows !== 0) {
    return {
      display: "flex",
      flexDirection: "column",
      height: props.$height,
      width: props.$width,
    };
  }
  return {
    ...(props.$animation
      ? { ...animationStyle, backgroundImage: getAnimationColor(props) }
      : { backgroundColor: props.$theme.colors.backgroundTertiary }),
    height: props.$height,
    width: props.$width,
  };
});
export const StyledRow = styled("div", (props) => {
  return {
    ...(props.$animation
      ? { ...animationStyle, backgroundImage: getAnimationColor(props) }
      : { backgroundColor: props.$theme.colors.backgroundTertiary }),
    width: "100%",
    height: "15px",
    marginBottom: props.$isLastRow ? "0px" : "10px",
  };
});
