import * as React from "react";
import { useStyletron } from "../styles";
import { mergeOverride, toObjectOverride } from "../helpers/overrides";
import Icon from "./icon";
function TriangleRight(props, ref) {
  const [, theme] = useStyletron();
  const { title = "Triangle Right", size, color, overrides = {}, ...restProps } = props;
  const SvgOverride = mergeOverride({
    component: theme.icons && theme.icons.TriangleRight ? theme.icons.TriangleRight : null
  }, overrides && overrides.Svg ? toObjectOverride(overrides.Svg) : {});
  return <Icon viewBox="0 0 24 24" ref={ref} title={title} size={size} color={color} overrides={{ Svg: SvgOverride }} {...restProps}><path d="M15.2929 11.2929L10.8536 6.85355C10.5386 6.53857 10 6.76165 10 7.20711L10 16.7929C10 17.2383 10.5386 17.4614 10.8536 17.1464L15.2929 12.7071C15.6834 12.3166 15.6834 11.6834 15.2929 11.2929Z" /></Icon>;
}
export default React.forwardRef(TriangleRight);
