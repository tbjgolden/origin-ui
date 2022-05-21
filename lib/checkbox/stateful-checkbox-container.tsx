import React from "react";
import { STATE_TYPE } from "./constants";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulCheckboxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (event) => {
      this.stateReducer(STATE_TYPE.change, event);
      const { onChange } = this.props;
      onChange && onChange(event);
    };
    this.onMouseEnter = (event) => {
      const { onMouseEnter } = this.props;
      onMouseEnter && onMouseEnter(event);
    };
    this.onMouseLeave = (event) => {
      const { onMouseLeave } = this.props;
      onMouseLeave && onMouseLeave(event);
    };
    this.onFocus = (event) => {
      const { onFocus } = this.props;
      onFocus && onFocus(event);
    };
    this.onBlur = (event) => {
      const { onBlur } = this.props;
      onBlur && onBlur(event);
    };
    this.stateReducer = (type, event) => {
      let nextState = {};
      const { stateReducer } = this.props;
      switch (type) {
        case STATE_TYPE.change:
          nextState = { checked: event.target.checked };
          break;
      }
      const newState = stateReducer(type, nextState, this.state, event);
      this.setState(newState);
    };
    const { initialState } = this.props;
    this.state = {
      ...initialState,
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
    const { onChange, onMouseEnter, onMouseLeave, onFocus, onBlur } = this;
    return children({
      ...restProps,
      checked: this.state.checked,
      isIndeterminate: this.state.isIndeterminate,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    });
  }
}
StatefulCheckboxContainer.defaultProps = {
  initialState: {
    checked: false,
    isIndeterminate: false,
  },
  stateReducer: defaultStateReducer,
  onChange: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onFocus: () => {},
  onBlur: () => {},
};
export default StatefulCheckboxContainer;
