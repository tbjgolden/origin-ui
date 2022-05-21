import { Children } from "react";
import { LocaleContext } from "../locale";
import { ThemeContext } from "../styles/theme-provider";
import ChevronRight from "../icon/chevron-right";
import ChevronLeft from "../icon/chevron-left";
import {
  StyledList,
  StyledListItem,
  StyledRoot,
  StyledSeparator
} from "./styled-components";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
export function Breadcrumbs(props) {
  const { overrides = {}, showTrailingSeparator = false } = props;
  const childrenArray = Children.toArray(props.children);
  const childrenWithSeparators = [];
  const [Root, baseRootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Right, baseIconProps] = getOverrides(overrides.Icon, ChevronRight);
  const [Left] = getOverrides(overrides.Icon, ChevronLeft);
  const [List, baseListProps] = getOverrides(overrides.List, StyledList);
  const [ListItem, baseListItemProps] = getOverrides(overrides.ListItem, StyledListItem);
  const [Separator, baseSeparatorProps] = getOverrides(overrides.Separator, StyledSeparator);
  baseIconProps.overrides = mergeOverrides({ Svg: { style: { verticalAlign: "text-bottom" } } }, baseIconProps && baseIconProps.overrides);
  for (const [index, child] of childrenArray.entries()) {
    childrenWithSeparators.push(<ListItem key={`breadcrumb-item-${index}`} $itemIndex={index} {...baseListItemProps}>
      {child}
      {(showTrailingSeparator || index !== childrenArray.length - 1) && <Separator {...baseSeparatorProps} key={`separator-${index}`}><ThemeContext.Consumer>{(theme) => {
        return theme.direction === "rtl" ? <Left size={16} {...baseIconProps} /> : <Right size={16} {...baseIconProps} />;
      }}</ThemeContext.Consumer></Separator>}
    </ListItem>);
  }
  return <LocaleContext.Consumer>{(locale) => {
    return <Root aria-label={props["aria-label"] || props.ariaLabel || locale.breadcrumbs.ariaLabel} data-baseweb="breadcrumbs" {...baseRootProps}><List {...baseListProps}>{childrenWithSeparators}</List></Root>;
  }}</LocaleContext.Consumer>;
}
Breadcrumbs.defaultProps = {
  overrides: {},
  showTrailingSeparator: false
};
export default Breadcrumbs;
