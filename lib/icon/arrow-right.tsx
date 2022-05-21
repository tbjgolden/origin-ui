import * as React from "react";
import { useStyletron } from "../styles";
import { mergeOverride, toObjectOverride } from "../helpers/overrides";
import Icon from "./icon";
function ArrowRight(props, ref) {
  const [, theme] = useStyletron();
  const { title = "Arrow Right", size, color, overrides = {}, ...restProps } = props;
  const SvgOverride = mergeOverride({
    component: theme.icons && theme.icons.ArrowRight ? theme.icons.ArrowRight : null
  }, overrides && overrides.Svg ? toObjectOverride(overrides.Svg) : {});
  return <Icon viewBox="0 0 24 24" ref={ref} title={title} size={size} color={color} overrides={{ Svg: SvgOverride }} {...restProps}><path fillRule="evenodd" clipRule="evenodd" d="M6 12C6 12.5523 6.44772 13 7 13H14.5858L12.2929 15.2929C11.9024 15.6834 11.9024 16.3166 12.2929 16.7071C12.6834 17.0976 13.3166 17.0976 13.7071 16.7071L17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929L13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289C11.9024 7.68342 11.9024 8.31658 12.2929 8.70711L14.5858 11H7C6.44772 11 6 11.4477 6 12Z" /></Icon>;
}
export default React.forwardRef(ArrowRight);
