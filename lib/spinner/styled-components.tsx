import { styled } from "../styles";
import { SIZE } from "./constants";
const spin = {
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
};
export const StyledSpinner = styled(
  "i",
  ({
    $theme,
    $color = $theme.colors.contentAccent,
    $borderWidth,
    $size = SIZE.medium,
  }) => {
    let borderSize = {
      large: $theme.sizing.scale300,
      medium: $theme.sizing.scale100,
      small: $theme.sizing.scale0,
    }[$borderWidth || $size];
    let boxSize = {
      large: $theme.sizing.scale1000,
      medium: $theme.sizing.scale900,
      small: $theme.sizing.scale800,
    }[$size];
    if (!borderSize) {
      borderSize = $theme.sizing[$borderWidth];
      if (!borderSize) {
        borderSize = `${Number.parseInt($borderWidth)}px`;
      }
    }
    if (!boxSize) {
      boxSize = $theme.sizing[$size];
      if (!boxSize) {
        boxSize = `${Number.parseInt($size)}px`;
      }
    }
    return {
      display: "block",
      animationName: spin,
      animationDuration: $theme.animation.timing1000,
      animationIterationCount: "infinite",
      animationTimingFunction: "linear",
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
      borderTopStyle: "solid",
      borderBottomStyle: "solid",
      borderRadius: "50%",
      borderTopColor: $color,
      borderRightColor: $theme.colors.backgroundTertiary,
      borderBottomColor: $theme.colors.backgroundTertiary,
      borderLeftColor: $theme.colors.backgroundTertiary,
      borderLeftWidth: borderSize,
      borderRightWidth: borderSize,
      borderTopWidth: borderSize,
      borderBottomWidth: borderSize,
      width: boxSize,
      height: boxSize,
      cursor: "wait",
    };
  }
);
