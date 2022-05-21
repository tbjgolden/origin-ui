import { styled } from "../styles";
import {
  getInputStyles,
  getInputContainerStyles,
  getRootStyles,
} from "../input/styled-components";
export const StyledTextAreaRoot = styled("div", (props) => {
  return getRootStyles({ $positive: false, ...props, $hasIconTrailing: false });
});
export const StyledTextareaContainer = styled("div", (props) => {
  return {
    ...getInputContainerStyles({ $positive: false, ...props }),
  };
});
export const StyledTextarea = styled("textarea", (props) => {
  return {
    ...getInputStyles(props),
    resize: "none",
  };
});
