import * as React from "react";
import {
  createStyled,
  withStyle as styletronWithStyle,
  useStyletron as styletronUseStyletron,
  withWrapper as styletronWithWrapper,
} from "styletron-react";
import { driver, getInitialStyle } from "styletron-standard";
import type { StyleObject } from "styletron-standard";
import type { ThemeT } from "./types";

import { ThemeContext } from "./theme-provider";

const wrapper = (StyledComponent) => {
  // eslint-disable-next-line react/display-name
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

/* eslint-disable flowtype/generic-spacing */
/* flowlint unclear-type:off */
export type StyletronComponent<Props> = React.StatelessFunctionalComponent<Props> & {
  __STYLETRON__: any;
};

/* eslint-enable flowtype/generic-spacing */
/* flowlint unclear-type:error */

export function createThemedStyled<Theme>(): StyleFn<Theme> {
  return createStyled({
    wrapper,
    getInitialStyle,
    driver,
  });
}

export const styled = createThemedStyled<ThemeT>();

export function createThemedWithStyle<Theme>(): WithStyleFn<Theme> {
  return styletronWithStyle;
}

export const withStyle = createThemedWithStyle<ThemeT>();

type UseStyletronFn<Theme> = () => [(StyleObject) => string, Theme];

export function createThemedUseStyletron<Theme>(): UseStyletronFn<Theme> {
  return function () {
    const theme = React.useContext(ThemeContext);
    const [css] = styletronUseStyletron();
    return [css, theme];
  };
}

export const useStyletron = createThemedUseStyletron<ThemeT>();

export function withWrapper(StyledElement: StyletronComponent<any>, wrapperFn) {
  return styletronWithWrapper<StyletronComponent<any>, any>(StyledElement, (Styled) => {
    // eslint-disable-next-line react/display-name
    return React.forwardRef((props, ref) => {
      return (
        <ThemeContext.Consumer>
          {(theme) => {
            return wrapperFn(Styled)({ ref: ref, ...props, $theme: theme });
          }}
        </ThemeContext.Consumer>
      );
    });
  });
}
