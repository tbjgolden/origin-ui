import React from "react";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulSelectContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { ...this.props.initialState };
    this.onChange = (params) => {
      this.internalSetState(params);
      this.props.onChange(params);
    };
    this.internalSetState = (params) => {
      const { stateReducer } = this.props;
      const nextState = { value: params.value };
      this.setState(stateReducer(params.type, nextState, this.state));
    };
  }
  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    return children({
      ...restProps,
      ...this.state,
      onChange: this.onChange,
    });
  }
}
StatefulSelectContainer.defaultProps = {
  initialState: {
    value: [],
  },
  onChange: () => {},
  overrides: {},
  stateReducer: defaultStateReducer,
};
export default StatefulSelectContainer;
