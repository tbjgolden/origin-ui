import React from "react";
import { STATE_CHANGE_TYPE } from "./constants";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      activeItemId: "",
      ...this.props.initialState,
    };
    this.onChange = (params) => {
      const { onChange } = this.props;
      this.internalSetState(STATE_CHANGE_TYPE.change, params.item);
      if (typeof onChange === "function") {
        onChange(params);
      }
    };
    this.internalSetState = (type, item) => {
      let nextState = {};
      if (type === STATE_CHANGE_TYPE.change) {
        nextState = { activeItemId: item.itemId };
      }
      const newState = this.props.stateReducer
        ? this.props.stateReducer(type, nextState, this.state)
        : nextState;
      this.setState(newState);
    };
  }
  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    const { onChange } = this;
    return children({
      ...restProps,
      ...this.state,
      onChange,
    });
  }
}
StatefulContainer.defaultProps = {
  initialState: {},
  stateReducer: defaultStateReducer,
  onChange: () => {},
};
export default StatefulContainer;
