import * as React from "react";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      prop: true,
      ...this.props.initialState,
    };
    this.onClick = (...args) => {
      if (typeof this.props.onClick === "function") {
        this.props.onClick(...args);
      }
      this.internalSetState("click", { prop: !this.state.prop });
    };
  }
  internalSetState(type, changes) {
    const { stateReducer } = this.props;
    if (typeof stateReducer !== "function") {
      this.setState(changes);
      return;
    }
    this.setState((prevState) => {
      return stateReducer(type, changes, prevState);
    });
  }
  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    return this.props.children({
      ...restProps,
      ...this.state,
      onClick: this.onClick,
    });
  }
}
StatefulContainer.defaultProps = {
  initialState: { prop: true },
  stateReducer: defaultStateReducer,
};
export default StatefulContainer;
