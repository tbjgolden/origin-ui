import * as React from "react";
import { STATE_CHANGE_TYPE } from "./constants";
class StatefulContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (data) => {
      const { date } = data;
      this.internalSetState(STATE_CHANGE_TYPE.change, { value: date });
      const onChange = this.props.onChange;
      if (onChange) {
        if (Array.isArray(date)) {
          if (date.every(Boolean)) {
            onChange({ date });
          }
        } else {
          onChange({ date });
        }
      }
      const onRangeChange = this.props.onRangeChange;
      if (onRangeChange) {
        onRangeChange({ date });
      }
    };
    const value = props.range ? [] : null;
    this.state = { value, ...props.initialState };
  }
  internalSetState(type, changes) {
    const { stateReducer } = this.props;
    this.setState((prevState) => {
      return stateReducer(type, changes, prevState);
    });
  }
  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    return this.props.children({
      ...restProps,
      value: this.state.value,
      onChange: this.onChange
    });
  }
}
StatefulContainer.defaultProps = {
  initialState: {},
  stateReducer: (type, nextState) => {
    return nextState;
  },
  onChange: () => {
  }
};
export default StatefulContainer;
