import * as React from "react";
import { useStyletron } from "../styles";
import { mergeOverride, toObjectOverride } from "../helpers/overrides";
import Icon from "./icon";
function TriangleLeft(props, ref) {
  const [, theme] = useStyletron();
  const { title = "Triangle Left", size, color, overrides = {}, ...restProps } = props;
  const SvgOverride = mergeOverride(
    {
      component:
        theme.icons && theme.icons.TriangleLeft ? theme.icons.TriangleLeft : null,
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
      <path d="M8.70711 11.2929L13.1464 6.85355C13.4614 6.53857 14 6.76165 14 7.20711L14 16.7929C14 17.2383 13.4614 17.4614 13.1464 17.1464L8.70711 12.7071C8.31658 12.3166 8.31658 11.6834 8.70711 11.2929Z" />
    </Icon>
  );
}
export default React.forwardRef(TriangleLeft);
