import { styled, withStyle } from "../styles";
import {
  Root as StyledInputRoot,
  Input as StyledInputInput,
} from "../input/styled-components";
import { SIZE } from "../input/constants";
export const StyledRoot = styled("div", {
  display: "flex",
  alignItems: "center",
});
export const StyledInputOverrideRoot = withStyle(
  StyledInputRoot,
  ({ $size = SIZE.default }) => {
    const width = {
      [SIZE.mini]: "32px",
      [SIZE.compact]: "36px",
      [SIZE.default]: "48px",
      [SIZE.large]: "56px",
    }[$size];
    return {
      width,
      marginRight: "8px",
    };
  }
);
export const StyledInputOverrideInput = withStyle(StyledInputInput, {
  textAlign: "center",
  paddingLeft: "0",
  paddingRight: "0",
});
