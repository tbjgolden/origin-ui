import * as React from "react";
import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  STATE_CHANGE_TYPE,
  TRIGGER_TYPE,
  POPOVER_MARGIN
} from "./constants";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
class StatefulContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpen: false,
      ...this.props.initialState
    };
    this.onBlur = (e) => {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
      if (this.props.focusLock || this.props.autoFocus) {
        return;
      }
      this.close();
    };
    this.onClick = (e) => {
      if (this.props.onClick) {
        this.props.onClick(e);
      }
      if (this.state.isOpen) {
        this.close();
      } else {
        this.open();
      }
    };
    this.onClickOutside = () => {
      this.close();
    };
    this.onEsc = () => {
      this.close();
    };
    this.onFocus = (e) => {
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
      this.open();
    };
    this.onMouseEnter = (e) => {
      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(e);
      }
      this.open();
    };
    this.onMouseLeave = (e) => {
      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(e);
      }
      this.close();
    };
    this.onContentClose = () => {
      this.close();
    };
    this.renderContent = () => {
      const { content } = this.props;
      if (typeof content === "function") {
        return content({ close: this.onContentClose });
      }
      return content;
    };
  }
  open() {
    this.internalSetState(STATE_CHANGE_TYPE.open, {
      isOpen: true
    });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }
  close() {
    this.internalSetState(STATE_CHANGE_TYPE.close, {
      isOpen: false
    });
    if (this.props.onClose) {
      this.props.onClose();
    }
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
    const {
      accessibilityType,
      autoFocus,
      animateOutTime,
      dismissOnClickOutside,
      dismissOnEsc,
      focusLock,
      ignoreBoundary,
      mountNode,
      onBlur,
      onClick,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onMouseEnterDelay,
      onMouseLeaveDelay,
      overrides,
      placement,
      popperOptions,
      renderAll,
      returnFocus,
      showArrow,
      triggerType,
      popoverMargin,
      focusOptions
    } = this.props;
    const popoverProps = {
      accessibilityType,
      animateOutTime,
      autoFocus,
      content: this.renderContent,
      focusLock,
      ignoreBoundary,
      isOpen: this.state.isOpen,
      mountNode,
      onBlur,
      onClick,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onMouseEnterDelay,
      onMouseLeaveDelay,
      overrides,
      placement,
      popperOptions,
      renderAll,
      returnFocus,
      showArrow,
      triggerType,
      popoverMargin,
      focusOptions
    };
    if (dismissOnClickOutside) {
      popoverProps.onClickOutside = this.onClickOutside;
    }
    if (dismissOnEsc) {
      popoverProps.onEsc = this.onEsc;
    }
    if (triggerType === TRIGGER_TYPE.hover) {
      popoverProps.onBlur = this.onBlur;
      popoverProps.onFocus = this.onFocus;
      popoverProps.onMouseEnter = this.onMouseEnter;
      popoverProps.onMouseLeave = this.onMouseLeave;
    } else {
      popoverProps.onClick = this.onClick;
    }
    return this.props.children(popoverProps);
  }
}
StatefulContainer.defaultProps = {
  accessibilityType: ACCESSIBILITY_TYPE.menu,
  ignoreBoundary: false,
  overrides: {},
  onMouseEnterDelay: 200,
  onMouseLeaveDelay: 200,
  placement: PLACEMENT.auto,
  popperOptions: {},
  showArrow: false,
  triggerType: TRIGGER_TYPE.click,
  dismissOnClickOutside: true,
  dismissOnEsc: true,
  stateReducer: defaultStateReducer,
  popoverMargin: POPOVER_MARGIN
};
export default StatefulContainer;
