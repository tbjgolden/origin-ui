import { styled } from "../styles/index.js";
import { SHAPE } from "../button/index.js";

export const StyledRoot = styled<{ $shape: string; $length: number }>(
  "div",
  ({ $shape, $length, $theme }) => {
    const margin =
      $length === 1
        ? undefined
        : $shape !== SHAPE.default
        ? `-${$theme.sizing.scale100}`
        : "-0.5px";
    return {
      display: "flex",
      marginLeft: margin,
      marginRight: margin,
    };
  }
);
