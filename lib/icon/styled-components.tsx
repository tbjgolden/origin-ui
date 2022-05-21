import { styled } from "../styles";
export function getSvgStyles({ $theme, $size, $color }) {
  let size = $theme.sizing.scale600;
  if ($size) {
    if ($theme.sizing[$size]) {
      size = $theme.sizing[$size];
    } else if (typeof $size === "number") {
      size = `${$size}px`;
    } else {
      size = $size;
    }
  }
  let color = "currentColor";
  if ($color) {
    color = $theme.colors[$color] ? $theme.colors[$color] : $color;
  }
  return {
    display: "inline-block",
    fill: color,
    color,
    height: size,
    width: size,
  };
}
export const Svg = styled("svg", getSvgStyles);
