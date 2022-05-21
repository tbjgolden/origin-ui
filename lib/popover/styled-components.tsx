import { styled } from "../styles";
import { ARROW_SIZE, ARROW_WIDTH } from "./constants";
import {
  getPopoverMarginStyles,
  getArrowPositionStyles,
  getStartPosition,
  getEndPosition,
} from "./utils";
export function getBodyStyles(props) {
  const {
    $animationDuration,
    $isOpen,
    $isAnimating,
    $placement,
    $popoverOffset,
    $showArrow,
    $theme,
    $popoverMargin,
    $isHoverTrigger,
  } = props;
  return {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: $theme.colors.backgroundTertiary,
    borderTopLeftRadius: $theme.borders.popoverBorderRadius,
    borderTopRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomLeftRadius: $theme.borders.popoverBorderRadius,
    boxShadow: $theme.lighting.shadow600,
    transitionProperty: "opacity,transform",
    transitionDuration: $isAnimating
      ? $isOpen
        ? "0.1s"
        : `${$animationDuration}ms`
      : "0s",
    transitionTimingFunction: $isOpen
      ? $theme.animation.easeOutCurve
      : $theme.animation.easeInCurve,
    opacity: $isAnimating && $isOpen ? 1 : 0,
    transform:
      $isAnimating && $isOpen
        ? getEndPosition($popoverOffset)
        : getStartPosition(
            $popoverOffset,
            $placement,
            $showArrow ? ARROW_SIZE : 0,
            $popoverMargin
          ),
    ...getPopoverMarginStyles($showArrow ? ARROW_SIZE : 0, $placement, $popoverMargin),
    ...($isHoverTrigger
      ? {
          animationDuration: ".1s",
          animationName: {
            "0%": { pointerEvents: "none" },
            "99%": { pointerEvents: "none" },
            "100%": { pointerEvents: "auto" },
          },
        }
      : {}),
  };
}
export const Body = styled("div", getBodyStyles);
export function getArrowStyles(props) {
  const { $arrowOffset, $placement, $theme } = props;
  return {
    backgroundColor: $theme.colors.backgroundTertiary,
    boxShadow: $theme.lighting.shadow600,
    width: `${ARROW_WIDTH}px`,
    height: `${ARROW_WIDTH}px`,
    transform: "rotate(45deg)",
    position: "absolute",
    ...getArrowPositionStyles($arrowOffset, $placement),
  };
}
export const Arrow = styled("div", getArrowStyles);
export function getInnerStyles({ $theme }) {
  return {
    backgroundColor: $theme.colors.backgroundTertiary,
    borderTopLeftRadius: $theme.borders.popoverBorderRadius,
    borderTopRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomRightRadius: $theme.borders.popoverBorderRadius,
    borderBottomLeftRadius: $theme.borders.popoverBorderRadius,
    color: $theme.colors.contentPrimary,
    position: "relative",
  };
}
export const Inner = styled("div", getInnerStyles);
export const Padding = styled("div", {
  paddingLeft: "12px",
  paddingTop: "12px",
  paddingRight: "12px",
  paddingBottom: "12px",
});
export const Hidden = styled("div", {
  display: "none",
});
