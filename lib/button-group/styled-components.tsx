import { styled } from "../styles";
import { SHAPE } from "../button";
export const StyledRoot = styled("div", ({ $shape, $length, $theme }) => {
  const margin = $length === 1 ? void 0 : $shape !== SHAPE.default ? `-${$theme.sizing.scale100}` : "-0.5px";
  return {
    display: "flex",
    marginLeft: margin,
    marginRight: margin
  };
});
