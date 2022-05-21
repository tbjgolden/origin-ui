import { styled } from "../styles";
import {
  getBodyStyles,
  getArrowStyles,
  getInnerStyles,
} from "../popover/styled-components";
import { getEndPosition } from "../popover/utils";
export const Body = styled("div", (props) => {
  return {
    ...getBodyStyles(props),
    backgroundColor: props.$theme.colors.tooltipBackground,
    borderTopLeftRadius: props.$theme.borders.radius300,
    borderTopRightRadius: props.$theme.borders.radius300,
    borderBottomRightRadius: props.$theme.borders.radius300,
    borderBottomLeftRadius: props.$theme.borders.radius300,
    boxShadow: props.$theme.lighting.shadow400,
    color: props.$theme.colors.tooltipText,
    transitionProperty: "opacity",
    transform: getEndPosition(props.$popoverOffset),
  };
});
export const Inner = styled("div", (props) => {
  return {
    ...getInnerStyles(props),
    backgroundColor: props.$theme.colors.tooltipBackground,
    borderTopLeftRadius: props.$theme.borders.radius300,
    borderTopRightRadius: props.$theme.borders.radius300,
    borderBottomRightRadius: props.$theme.borders.radius300,
    borderBottomLeftRadius: props.$theme.borders.radius300,
    paddingTop: props.$theme.sizing.scale300,
    paddingBottom: props.$theme.sizing.scale300,
    paddingLeft: props.$theme.sizing.scale600,
    paddingRight: props.$theme.sizing.scale600,
    ...props.$theme.typography.font150,
    color: props.$theme.colors.tooltipText,
  };
});
export const Arrow = styled("div", (props) => {
  return {
    ...getArrowStyles(props),
    backgroundColor: props.$theme.colors.tooltipBackground,
  };
});
