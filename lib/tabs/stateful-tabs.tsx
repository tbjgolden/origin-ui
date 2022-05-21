import React from "react";
import Tabs from "./tabs";
import { STATE_CHANGE_TYPE } from "./constants";
export default class StatefulTabs extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      activeKey: this.getInitialKey(),
    };
    this.onTabChange = (newState) => {
      this.internalSetState(STATE_CHANGE_TYPE.change, newState);
    };
  }
  internalSetState(type, changes) {
    const { stateReducer, onChange } = this.props;
    const newState = stateReducer(type, changes, this.state);
    this.setState(newState);
    typeof onChange === "function" && onChange(newState);
  }
  getInitialKey() {
    const { initialState, children } = this.props;
    return initialState && initialState.activeKey
      ? initialState.activeKey
      : React.Children.map(children, (child, index) => {
          return child.key || String(index);
        })[0];
  }
  render() {
    const { initialState, stateReducer, ...restProps } = this.props;
    return (
      <Tabs {...restProps} activeKey={this.state.activeKey} onChange={this.onTabChange} />
    );
  }
}
StatefulTabs.defaultProps = {
  disabled: false,
  onChange: () => {},
  overrides: {},
  stateReducer: (type, newState) => {
    return newState;
  },
};
