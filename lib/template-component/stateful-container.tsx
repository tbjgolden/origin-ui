import * as React from "react";
import type {
  StateT,
  StatefulComponentContainerPropsT,
  StateChangeTypeT,
  StateReducerT,
} from "./types";

const defaultStateReducer: StateReducerT = (type, nextState) => {
  return nextState;
};

class StatefulContainer extends React.Component<
  StatefulComponentContainerPropsT,
  StateT
> {
  static defaultProps: $Shape<StatefulComponentContainerPropsT> = {
    initialState: { prop: true },
    stateReducer: defaultStateReducer,
  };

  state = {
    prop: true,
    ...this.props.initialState,
  };

  onClick = (...args: []) => {
    if (typeof this.props.onClick === "function") {
      this.props.onClick(...args);
    }
    this.internalSetState("click", { prop: !this.state.prop });
  };

  internalSetState(type: StateChangeTypeT, changes: StateT) {
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

export default StatefulContainer;
