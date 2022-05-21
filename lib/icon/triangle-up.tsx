import * as React from "react";
import { useStyletron } from "../styles";
import { mergeOverride, toObjectOverride } from "../helpers/overrides";
import Icon from "./icon";
function TriangleUp(props, ref) {
  const [, theme] = useStyletron();
  const { title = "Triangle Up", size, color, overrides = {}, ...restProps } = props;
  const SvgOverride = mergeOverride(
    {
      component: theme.icons && theme.icons.TriangleUp ? theme.icons.TriangleUp : null,
    },
    overrides && overrides.Svg ? toObjectOverride(overrides.Svg) : {}
  );
  return (
    <Icon
      viewBox="0 0 24 24"
      ref={ref}
      title={title}
      size={size}
      color={color}
      overrides={{ Svg: SvgOverride }}
      {...restProps}
    >
      <path d="M12.7071 8.70711L17.1464 13.1464C17.4614 13.4614 17.2383 14 16.7929 14L7.20711 14C6.76165 14 6.53857 13.4614 6.85355 13.1464L11.2929 8.70711C11.6834 8.31658 12.3166 8.31658 12.7071 8.70711Z" />
    </Icon>
  );
}
export default React.forwardRef(TriangleUp);
