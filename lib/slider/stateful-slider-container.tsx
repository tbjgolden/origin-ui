import React from "react";
import { STATE_CHANGE_TYPE } from "./constants";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulSliderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (params) => {
      this.internalSetState(STATE_CHANGE_TYPE.change, params);
      return this.props.onChange({ ...params });
    };
    this.onFinalChange = (params) => {
      this.internalSetState(STATE_CHANGE_TYPE.finalChange, params);
      return this.props.onFinalChange({ ...params });
    };
    this.internalSetState = (type, { value }) => {
      const nextState = { value };
      const { stateReducer } = this.props;
      const newState = stateReducer(type, nextState, this.state);
      this.setState(newState);
    };
    this.state = {
      value:
        props.initialState && Array.isArray(props.initialState.value)
          ? props.initialState.value
          : [Math.round((props.max - props.min) / 2) + props.min],
    };
  }
  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    return children({
      ...restProps,
      ...this.state,
      onChange: this.onChange,
      onFinalChange: this.onFinalChange,
    });
  }
}
StatefulSliderContainer.defaultProps = {
  stateReducer: defaultStateReducer,
  min: 0,
  max: 100,
  step: 1,
  marks: false,
  onChange: () => {},
  onFinalChange: () => {},
};
export default StatefulSliderContainer;
