import * as React from "react";
import { STATE_CHANGE_TYPE } from "./constants";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: "",
      ...this.props.initialState
    };
    this.onChange = (e) => {
      const nextState = { value: e.target.value };
      this.internalSetState(STATE_CHANGE_TYPE.change, nextState);
      this.props.onChange(e);
    };
    this.internalSetState = (type, nextState) => {
      const newState = this.props.stateReducer(type, nextState, this.state);
      this.setState(newState);
    };
  }
  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    const { onChange } = this;
    return children({
      ...restProps,
      ...this.state,
      onChange
    });
  }
}
StatefulContainer.defaultProps = {
  initialState: {},
  stateReducer: defaultStateReducer,
  onChange: () => {
  },
  onClear: () => {
  }
};
export default StatefulContainer;
