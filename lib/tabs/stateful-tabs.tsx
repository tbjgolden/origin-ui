import * as React from "react";
import Tabs from "./tabs";
import { STATE_CHANGE_TYPE } from "./constants";
import type { StatefulTabsPropsT, StatefulTabsStateT, StateChangeTypeT } from "./types";

export default class StatefulTabs extends React.Component<
  StatefulTabsPropsT,
  StatefulTabsStateT
> {
  static defaultProps: $Shape<StatefulTabsPropsT> = {
    disabled: false,
    onChange: () => {},
    overrides: {},
    stateReducer: (type, newState) => {
      return newState;
    },
  };

  state = {
    activeKey: this.getInitialKey(),
  };

  onTabChange = (newState: StatefulTabsStateT) => {
    this.internalSetState(STATE_CHANGE_TYPE.change, newState);
  };

  internalSetState(type: StateChangeTypeT, changes: StatefulTabsStateT) {
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
