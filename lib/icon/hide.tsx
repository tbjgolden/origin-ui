import React from "react";
import { useStyletron } from "../styles";
import { mergeOverride, toObjectOverride } from "../helpers/overrides";
import Icon from "./icon";
function Hide(props, ref) {
  const [, theme] = useStyletron();
  const { title = "Hide", size, color, overrides = {}, ...restProps } = props;
  const SvgOverride = mergeOverride(
    {
      component: theme.icons && theme.icons.Hide ? theme.icons.Hide : null,
    },
    overrides && overrides.Svg ? toObjectOverride(overrides.Svg) : {}
  );
  return (
    <Icon
      viewBox="0 0 20 20"
      ref={ref}
      title={title}
      size={size}
      color={color}
      overrides={{ Svg: SvgOverride }}
      {...restProps}
    >
      <path d="M12.81 4.36l-1.77 1.78a4 4 0 00-4.9 4.9l-2.76 2.75C2.06 12.79.96 11.49.2 10a11 11 0 0112.6-5.64zm3.8 1.85c1.33 1 2.43 2.3 3.2 3.79a11 11 0 01-12.62 5.64l1.77-1.78a4 4 0 004.9-4.9l2.76-2.75zm-.25-3.99l1.42 1.42L3.64 17.78l-1.42-1.42L16.36 2.22z" />
    </Icon>
  );
}
export default React.forwardRef(Hide);
