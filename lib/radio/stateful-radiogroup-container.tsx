import * as React from "react";
import { STATE_TYPE } from "./constants";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulRadioGroupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (e) => {
      this.stateReducer(STATE_TYPE.change, e);
      const { onChange } = this.props;
      onChange && onChange(e);
    };
    this.stateReducer = (type, e) => {
      let nextState = {};
      const { stateReducer } = this.props;
      if (type === STATE_TYPE.change) {
        nextState = { value: e.target.value };
      }
      const newState = stateReducer(type, nextState, this.state, e);
      this.setState(newState);
    };
    const { initialState } = this.props;
    this.state = {
      ...initialState
    };
  }
  render() {
    const {
      children = (childProps) => {
        return null;
      },
      initialState,
      stateReducer,
      ...restProps
    } = this.props;
    const { onChange } = this;
    return children({
      ...restProps,
      value: this.state.value,
      onChange
    });
  }
}
StatefulRadioGroupContainer.defaultProps = {
  initialState: {
    value: ""
  },
  stateReducer: defaultStateReducer,
  onChange: () => {
  }
};
export default StatefulRadioGroupContainer;
