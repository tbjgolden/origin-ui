import * as React from "react";
import { STATE_TYPE } from "./constants";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulCheckboxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (e) => {
      this.stateReducer(STATE_TYPE.change, e);
      const { onChange } = this.props;
      onChange && onChange(e);
    };
    this.onMouseEnter = (e) => {
      const { onMouseEnter } = this.props;
      onMouseEnter && onMouseEnter(e);
    };
    this.onMouseLeave = (e) => {
      const { onMouseLeave } = this.props;
      onMouseLeave && onMouseLeave(e);
    };
    this.onFocus = (e) => {
      const { onFocus } = this.props;
      onFocus && onFocus(e);
    };
    this.onBlur = (e) => {
      const { onBlur } = this.props;
      onBlur && onBlur(e);
    };
    this.stateReducer = (type, e) => {
      let nextState = {};
      const { stateReducer } = this.props;
      switch (type) {
        case STATE_TYPE.change:
          nextState = { checked: e.target.checked };
          break;
      }
      const newState = stateReducer(type, nextState, this.state, e);
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
