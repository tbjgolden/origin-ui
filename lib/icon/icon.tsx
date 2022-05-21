import React from "react";
import { getOverrides } from "../helpers/overrides";
import { Svg as StyledSvg } from "./styled-components";
import omitDollarPrefixedKeys from "./omit-dollar-prefixed-keys";
function Icon(props, ref) {
  const { children, title, size, color, overrides = {}, ...restProps } = props;
  const [Svg, overrideProps] = getOverrides(overrides.Svg, StyledSvg);
  const passThroughProps = Svg.__STYLETRON__
    ? {
        title,
        $color: color,
        $size: size,
        ...restProps,
        ...overrideProps,
      }
    : {
        title,
        color,
        size,
        ...omitDollarPrefixedKeys(restProps),
        ...omitDollarPrefixedKeys(overrideProps),
      };
  return (
    <Svg data-baseweb="icon" ref={ref} {...passThroughProps}>
      {title ? <title>{title}</title> : null}
      {children}
    </Svg>
  );
}
export default React.forwardRef(Icon);
