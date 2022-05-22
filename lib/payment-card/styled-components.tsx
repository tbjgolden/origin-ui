import { styled } from "../styles";
import { SIZE } from "../input";
export const IconWrapper = styled("div", (props) => {
  const { $size, $theme } = props;
  const margin = {
    [SIZE.mini]: $theme.sizing.scale300,
    [SIZE.compact]: $theme.sizing.scale500,
    [SIZE.default]: $theme.sizing.scale600,
    [SIZE.large]: $theme.sizing.scale700,
  };
  return {
    marginLeft: margin[$size],
    height: "100%",
    display: "flex",
    alignItems: "center",
  };
});
