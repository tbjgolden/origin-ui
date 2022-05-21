import * as React from "react";
import { getOverrides } from "../helpers/overrides";
import NavItem from "./nav-item";
import {
  StyledRoot,
  StyledNavItemContainer,
  StyledSubNavContainer
} from "./styled-components";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
export default class SideNav extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { isFocusVisible: false };
    this.handleFocus = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisible: true });
      }
    };
    this.handleBlur = (event) => {
      if (this.state.isFocusVisible !== false) {
        this.setState({ isFocusVisible: false });
      }
    };
    this.activePredicate = (item) => {
      return item.itemId === this.props.activeItemId;
    };
  }
  render() {
    const { activeItemId, activePredicate, items, onChange, overrides, mapItem } = this.props;
    const navLevel = 1;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [NavItemContainer, itemContainerProps] = getOverrides(overrides.NavItemContainer, StyledNavItemContainer);
    const [SubNavContainer, subNavContainerProps] = getOverrides(overrides.SubNavContainer, StyledSubNavContainer);
    const renderNavItem = (item, level, index, mapItem2) => {
      if (typeof mapItem2 === "function") {
        const recMapItem = (item2) => {
          let subNav = [];
          if (item2.subNav) {
            subNav = item2.subNav.map(recMapItem);
          }
          return mapItem2({ ...item2, subNav });
        };
        item = recMapItem(item);
      }
      const sharedProps = {
        $active: activePredicate ? activePredicate(item, activeItemId) : this.activePredicate(item),
        $level: level,
        $selectable: !!item.itemId,
        $disabled: item.disabled || false
      };
      return <NavItemContainer key={`${index}-level${level}-${typeof item.title === "string" ? item.title : item.itemId || ""}`} {...sharedProps} {...itemContainerProps} onFocus={forkFocus(itemContainerProps, this.handleFocus)} onBlur={forkBlur(itemContainerProps, this.handleBlur)}><>
        <NavItem $isFocusVisible={this.state.isFocusVisible} item={item} itemMemoizationComparator={this.props.itemMemoizationComparator} onSelect={onChange} overrides={overrides} {...sharedProps} />
        {item.subNav ? <SubNavContainer role="list" {...sharedProps} {...subNavContainerProps}>{item.subNav.map((subitem, idx) => {
          return renderNavItem(subitem, level + 1, index);
        })}</SubNavContainer> : null}
      </></NavItemContainer>;
    };
    return <Root role="navigation" data-baseweb="side-navigation" {...rootProps}><SubNavContainer role="list">{items.map((item, index) => {
      return renderNavItem(item, navLevel, index, mapItem);
    })}</SubNavContainer></Root>;
  }
}
SideNav.defaultProps = {
  activeItemId: "/",
  activePredicate: null,
  items: [],
  overrides: {},
  mapItem: null
};
