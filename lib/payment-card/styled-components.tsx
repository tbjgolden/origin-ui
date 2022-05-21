
import { styled } from "../styles/index";
import { SIZE, type SizeT } from "../input/index";

export const IconWrapper = styled<{ $size: SizeT }>("div", (props) => {
  const { $size, $theme } = props;
  const margin = {
    [SIZE.mini]: $theme.sizing.scale300,
    [SIZE.compact]: $theme.sizing.scale500,
    [SIZE.default]: $theme.sizing.scale600,
    [SIZE.large]: $theme.sizing.scale700,
  };
  return {
    [(($theme.direction === "rtl" ? "marginRight" : "marginLeft"): string)]:
      margin[$size],
    height: "100%",
    display: "flex",
    alignItems: "center",
  };
});
