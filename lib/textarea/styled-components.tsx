import { styled, type ThemeT } from "../styles";
import {
  getInputStyles,
  getInputContainerStyles,
  getRootStyles,
} from "../input/styled-components";
import type { SharedStylePropsT } from "./types";

export const StyledTextAreaRoot = styled<SharedStylePropsT>(
  "div",
  (props: SharedStylePropsT & { $theme: ThemeT }) => {
    return getRootStyles({ $positive: false, ...props, $hasIconTrailing: false });
  }
);

export const StyledTextareaContainer = styled<SharedStylePropsT>(
  "div",
  (props: SharedStylePropsT & { $theme: ThemeT }) => {
    return {
      ...getInputContainerStyles({ $positive: false, ...props }),
    };
  }
);

export const StyledTextarea = styled<SharedStylePropsT>(
  "textarea",
  (props: SharedStylePropsT & { $theme: ThemeT }) => {
    return {
      ...getInputStyles(props),
      resize: "none",
    };
  }
);
