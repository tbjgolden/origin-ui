import React from "react";
import { useStyletron } from "../styles";
import { mergeOverride, toObjectOverride } from "../helpers/overrides";
import Icon from "./icon";
function TriangleDown(props, ref) {
  const [, theme] = useStyletron();
  const { title = "Triangle Down", size, color, overrides = {}, ...restProps } = props;
  const SvgOverride = mergeOverride(
    {
      component:
        theme.icons && theme.icons.TriangleDown ? theme.icons.TriangleDown : null,
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
      <path d="M12.7071 15.2929L17.1464 10.8536C17.4614 10.5386 17.2383 10 16.7929 10L7.20711 10C6.76165 10 6.53857 10.5386 6.85355 10.8536L11.2929 15.2929C11.6834 15.6834 12.3166 15.6834 12.7071 15.2929Z" />
    </Icon>
  );
}
export default React.forwardRef(TriangleDown);
