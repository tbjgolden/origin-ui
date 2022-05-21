import * as React from "react";
import { STATE_CHANGE_TYPE } from "./constants";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulPanelContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      expanded: false,
      ...this.props.initialState,
    };
    this.onChange = () => {
      if (typeof this.props.onChange === "function") {
        this.props.onChange({ expanded: !this.state.expanded });
      }
      this.internalSetState(STATE_CHANGE_TYPE.expand, {
        expanded: !this.state.expanded,
      });
    };
  }
  internalSetState(type, changes) {
    const { stateReducer } = this.props;
    this.setState((prevState) => {
      return stateReducer ? stateReducer(type, changes, prevState) : changes;
    });
  }
  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    return this.props.children({
      ...restProps,
      ...this.state,
      onChange: this.onChange,
    });
  }
}
StatefulPanelContainer.defaultProps = {
  initialState: { expanded: false },
  stateReducer: defaultStateReducer,
  onChange: () => {},
};
export default StatefulPanelContainer;
