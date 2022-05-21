import * as React from "react";
import { useStyletron } from "../styles";
import { mergeOverride, toObjectOverride } from "../helpers/overrides";
import Icon from "./icon";
function Spinner(props, ref) {
  const [, theme] = useStyletron();
  const { title = "Spinner", size, color, overrides = {}, ...restProps } = props;
  const SvgOverride = mergeOverride({
    component: theme.icons && theme.icons.Spinner ? theme.icons.Spinner : null
  }, overrides && overrides.Svg ? toObjectOverride(overrides.Svg) : {});
  return <Icon viewBox="0 0 24 24" ref={ref} title={title} size={size} color={color} overrides={{ Svg: SvgOverride }} {...restProps}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fillOpacity="0.32" />
    <path fillRule="evenodd" clipRule="evenodd" d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z" />
  </Icon>;
}
export default React.forwardRef(Spinner);
