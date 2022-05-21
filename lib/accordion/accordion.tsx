import * as React from "react";
import { getOverrides } from "../helpers/overrides";
import { Root as StyledRoot } from "./styled-components";
import { STATE_CHANGE_TYPE } from "./constants";
export default class Accordion extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      expanded: [],
      ...this.props.initialState,
    };
    this.itemRefs = [];
  }
  onPanelChange(key, onChange, ...args) {
    let activeKeys = this.state.expanded;
    const { accordion } = this.props;
    if (accordion) {
      activeKeys = activeKeys[0] === key ? [] : [key];
    } else {
      activeKeys = [...activeKeys];
      const index = activeKeys.indexOf(key);
      const wasExpanded = index > -1;
      if (wasExpanded) {
        activeKeys.splice(index, 1);
      } else {
        activeKeys.push(key);
      }
    }
    const newState = { expanded: activeKeys };
    this.internalSetState(STATE_CHANGE_TYPE.expand, newState);
    if (typeof onChange === "function") onChange(...args);
  }
  internalSetState(type, changes) {
    const { stateReducer, onChange } = this.props;
    const newState = stateReducer(type, changes, this.state);
    this.setState(newState);
    typeof onChange === "function" && onChange(newState);
  }
  handleKeyDown(e) {
    if (this.props.disabled) {
      return;
    }
    const itemRefs = this.itemRefs;
    const HOME = 36;
    const END = 35;
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;
    if (e.keyCode === HOME) {
      e.preventDefault();
      const firstItem = itemRefs[0];
      firstItem.current && firstItem.current.focus();
    }
    if (e.keyCode === END) {
      e.preventDefault();
      const lastItem = itemRefs[itemRefs.length - 1];
      lastItem.current && lastItem.current.focus();
    }
    if (e.keyCode === ARROW_UP) {
      e.preventDefault();
      const activeItemIdx = itemRefs.findIndex((item) => {
        return item.current === document.activeElement;
      });
      if (activeItemIdx > 0) {
        const prevItem = itemRefs[activeItemIdx - 1];
        prevItem.current && prevItem.current.focus();
      }
    }
    if (e.keyCode === ARROW_DOWN) {
      e.preventDefault();
      const activeItemIdx = itemRefs.findIndex((item) => {
        return item.current === document.activeElement;
      });
      if (activeItemIdx < itemRefs.length - 1) {
        const nextItem = itemRefs[activeItemIdx + 1];
        nextItem.current && nextItem.current.focus();
      }
    }
  }
  getItems() {
    const { expanded } = this.state;
    const { accordion, disabled, children, renderAll, overrides } = this.props;
    return React.Children.map(children, (child, index) => {
      if (!child) return;
      const itemRef = React.createRef();
      this.itemRefs.push(itemRef);
      const key = child.key || String(index);
      let isExpanded = false;
      isExpanded = accordion ? expanded[0] === key : expanded.includes(key);
      const props = {
        key,
        ref: itemRef,
        expanded: isExpanded || child.props.expanded,
        accordion,
        renderAll,
        overrides: child.props.overrides || overrides,
        disabled: child.props.disabled || disabled,
        onChange: (...args) => {
          return this.onPanelChange(key, child.props.onChange, ...args);
        },
      };
      return React.cloneElement(child, props);
    });
  }
  render() {
    const { overrides = {} } = this.props;
    const { Root: RootOverride } = overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    return (
      <Root
        data-baseweb="accordion"
        $disabled={this.props.disabled}
        $isFocusVisible={false}
        onKeyDown={this.handleKeyDown.bind(this)}
        {...rootProps}
      >
        {this.getItems()}
      </Root>
    );
  }
}
Accordion.defaultProps = {
  accordion: true,
  disabled: false,
  initialState: {
    expanded: [],
  },
  onChange: () => {},
  overrides: {},
  renderAll: false,
  stateReducer: (type, newState) => {
    return newState;
  },
};
