import React from "react";
import { getOverrides } from "../helpers/overrides";
import { StyledNavLink, StyledNavItem } from "./styled-components";
class NavItem extends React.Component {
  constructor() {
    super(...arguments);
    this.handleClick = (event) => {
      const { item, onSelect } = this.props;
      if (typeof onSelect === "function") {
        onSelect({ item, event });
      }
    };
    this.handleKeyDown = (event) => {
      const { item, onSelect } = this.props;
      if (event.key === "Enter" && typeof onSelect === "function") {
        onSelect({ item, event });
      }
    };
  }
  render() {
    const { item, overrides, itemMemoizationComparator, ...sharedProps } = this.props;
    const [NavItem2, itemProps] = getOverrides(overrides.NavItem, StyledNavItem);
    const [NavLink, linkProps] = getOverrides(overrides.NavLink, StyledNavLink);
    const tabIndex = {
      tabIndex: item.disabled ? -1 : void 0,
    };
    return (
      <NavLink
        $as={item.disabled ? "span" : "a"}
        href={item.disabled ? null : item.itemId}
        {...tabIndex}
        {...sharedProps}
        {...linkProps}
        {...(item.itemId && !item.disabled
          ? {
              onClick: this.handleClick,
              onKeyDown: this.handleKeyDown,
            }
          : {})}
      >
        <NavItem2 item={item} {...sharedProps} {...itemProps}>
          {item.title}
        </NavItem2>
      </NavLink>
    );
  }
}
NavItem.defaultProps = {
  overrides: {},
  onSelect: () => {},
};
function compare(prevProps, nextProps) {
  if (nextProps.itemMemoizationComparator) {
    return nextProps.itemMemoizationComparator(prevProps, nextProps);
  }
  return false;
}
export default React.memo(NavItem, compare);
