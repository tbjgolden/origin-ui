import React from "react";
import { getOverrides } from "../helpers/overrides";
import { Tab as StyledTab } from "./styled-components";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
class TabComponent extends React.Component {
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
    this.onClick = (e) => {
      const { disabled, onSelect, onClick } = this.props;
      if (disabled) {
        return;
      }
      typeof onClick === "function" && onClick(e);
      typeof onSelect === "function" && onSelect();
      return;
    };
    this.onKeyDown = (e) => {
      const { disabled, onSelect, onKeyDown } = this.props;
      if (disabled) {
        return;
      }
      typeof onKeyDown === "function" && onKeyDown(e);
      if (e.key === "Enter" || e.which === 32) {
        typeof onSelect === "function" && onSelect();
        e.which === 32 && e.preventDefault();
      }
      return;
    };
  }
  getSharedProps() {
    const { disabled, active, $orientation } = this.props;
    return {
      $disabled: disabled,
      $active: active,
      $orientation,
    };
  }
  render() {
    const { active, disabled, id, overrides = {}, children } = this.props;
    const sharedProps = this.getSharedProps();
    const { Tab: TabOverride } = overrides;
    const [Tab, tabProps] = getOverrides(TabOverride, StyledTab);
    return (
      <Tab
        $isFocusVisible={this.state.isFocusVisible}
        tabIndex={disabled ? -1 : 0}
        role="tab"
        id={id}
        aria-selected={active}
        aria-disabled={disabled || null}
        {...sharedProps}
        {...tabProps}
        onFocus={forkFocus(tabProps, this.handleFocus)}
        onBlur={forkBlur(tabProps, this.handleBlur)}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {children}
      </Tab>
    );
  }
}
TabComponent.defaultProps = {
  disabled: false,
  expanded: false,
  onSelect: () => {},
  onClick: () => {},
  onKeyDown: () => {},
  title: "",
};
export default TabComponent;
