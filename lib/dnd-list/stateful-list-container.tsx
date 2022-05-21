import * as React from "react";
import { arrayMove, arrayRemove } from "react-movable";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulListContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      items: [],
      ...this.props.initialState,
    };
    this.onChange = ({ oldIndex, newIndex, targetRect }) => {
      const newItemsState =
        newIndex === -1
          ? arrayRemove(this.state.items, oldIndex)
          : arrayMove(this.state.items, oldIndex, newIndex);
      this.props.onChange({
        newState: newItemsState,
        oldIndex,
        newIndex,
        targetRect,
      });
      this.internalSetState("change", { items: newItemsState });
    };
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
      items: this.state.items,
      onChange: this.onChange,
    });
  }
}
StatefulListContainer.defaultProps = {
  initialState: { items: [] },
  stateReducer: defaultStateReducer,
  onChange: () => {},
};
export default StatefulListContainer;
