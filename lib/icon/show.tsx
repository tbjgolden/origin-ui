import React from "react";
import { useStyletron } from "../styles";
import { mergeOverride, toObjectOverride } from "../helpers/overrides";
import Icon from "./icon";
function Show(props, ref) {
  const [, theme] = useStyletron();
  const { title = "Show", size, color, overrides = {}, ...restProps } = props;
  const SvgOverride = mergeOverride(
    {
      component: theme.icons && theme.icons.Show ? theme.icons.Show : null,
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
      <path d="M.2 10a11 11 0 0119.6 0A11 11 0 01.2 10zm9.8 4a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 110-4 2 2 0 010 4z" />
    </Icon>
  );
}
export default React.forwardRef(Show);
