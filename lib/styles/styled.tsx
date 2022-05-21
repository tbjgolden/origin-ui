import * as React from "react";
import {
  createStyled,
  withStyle as styletronWithStyle,
  useStyletron as styletronUseStyletron,
  withWrapper as styletronWithWrapper,
} from "styletron-react";
import { driver, getInitialStyle } from "styletron-standard";
import { ThemeContext } from "./theme-provider";
const wrapper = (StyledComponent) => {
  return React.forwardRef((props, ref) => {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return <StyledComponent ref={ref} {...props} $theme={theme} />;
        }}
      </ThemeContext.Consumer>
    );
  });
};
export function createThemedStyled() {
  return createStyled({
    wrapper,
    getInitialStyle,
    driver,
  });
}
export const styled = createThemedStyled();
export function createThemedWithStyle() {
  return styletronWithStyle;
}
export const withStyle = createThemedWithStyle();
export function createThemedUseStyletron() {
  return function () {
    const theme = React.useContext(ThemeContext);
    const [css] = styletronUseStyletron();
    return [css, theme];
  };
}
export const useStyletron = createThemedUseStyletron();
export function withWrapper(StyledElement, wrapperFn) {
  return styletronWithWrapper(StyledElement, (Styled) => {
    return React.forwardRef((props, ref) => {
      return (
        <ThemeContext.Consumer>
          {(theme) => {
            return wrapperFn(Styled)({ ref, ...props, $theme: theme });
          }}
        </ThemeContext.Consumer>
      );
    });
  });
}
