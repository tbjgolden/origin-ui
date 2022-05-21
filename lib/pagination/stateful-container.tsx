import React from "react";
import { STATE_CHANGE_TYPE } from "./constants";
import { clamp } from "./utils";
const initialState = {
  currentPage: 1,
};
export default class PaginationStatefulContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = this.props.initialState || initialState;
    this.onPageChange = ({ nextPage }) => {
      const { numPages, onPageChange } = this.props;
      const { currentPage } = this.state;
      const clamped = clamp(nextPage, 1, numPages);
      if (clamped !== currentPage) {
        onPageChange && onPageChange({ nextPage: clamped, prevPage: currentPage });
        this.internalSetState(STATE_CHANGE_TYPE.changePage, {
          currentPage: clamped,
        });
      }
    };
  }
  internalSetState(changeType, changes) {
    const { stateReducer } = this.props;
    if (stateReducer) {
      this.setState(stateReducer(changeType, changes, this.state));
    } else {
      this.setState(changes);
    }
  }
  render() {
    const { currentPage } = this.state;
    const { children } = this.props;
    return children({
      currentPage,
      onPageChange: this.onPageChange,
    });
  }
}
PaginationStatefulContainer.defaultProps = {
  initialState,
  stateReducer: (changeType, changes) => {
    return changes;
  },
};
