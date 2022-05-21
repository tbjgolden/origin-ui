import * as React from "react";
import FocusLock, { MoveFocusInside } from "react-focus-lock";
import { getOverride, getOverrideProps } from "../helpers/overrides";
import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
  ANIMATE_OUT_TIME,
  ANIMATE_IN_TIME,
  POPOVER_MARGIN
} from "./constants";
import { Layer, TetherBehavior } from "../layer";
import {
  Arrow as StyledArrow,
  Body as StyledBody,
  Inner as StyledInner,
  Hidden
} from "./styled-components";
import { fromPopperPlacement } from "./utils";
import defaultProps from "./default-props";
import { useUID } from "react-uid";
class PopoverInner extends React.Component {
  constructor() {
    super(...arguments);
    this.anchorRef = React.createRef();
    this.popperRef = React.createRef();
    this.arrowRef = React.createRef();
    this.state = this.getDefaultState(this.props);
    this.animateIn = () => {
      if (this.props.isOpen) {
        this.setState({ isAnimating: true });
      }
    };
    this.animateOut = () => {
      if (!this.props.isOpen) {
        this.setState({ isAnimating: true });
        this.animateOutCompleteTimer = setTimeout(() => {
          this.setState({
            isAnimating: false,
            placement: this.props.placement
          });
        }, this.props.animateOutTime || ANIMATE_OUT_TIME);
      }
    };
    this.onAnchorClick = (e) => {
      if (this.props.onClick) {
        this.props.onClick(e);
      }
    };
    this.onAnchorMouseEnter = (e) => {
      if (this.onMouseLeaveTimer) {
        clearTimeout(this.onMouseLeaveTimer);
      }
      this.triggerOnMouseEnterWithDelay(e);
    };
    this.onAnchorMouseLeave = (e) => {
      if (this.onMouseEnterTimer) {
        clearTimeout(this.onMouseEnterTimer);
      }
      this.triggerOnMouseLeaveWithDelay(e);
    };
    this.onPopoverMouseEnter = () => {
      if (this.onMouseLeaveTimer) {
        clearTimeout(this.onMouseLeaveTimer);
      }
    };
    this.onPopoverMouseLeave = (e) => {
      this.triggerOnMouseLeaveWithDelay(e);
    };
    this.onPopperUpdate = (normalizedOffsets, data) => {
      const placement = fromPopperPlacement(data.placement) || PLACEMENT.top;
      this.setState({
        arrowOffset: normalizedOffsets.arrow,
        popoverOffset: normalizedOffsets.popper,
        placement
      });
      this.animateInTimer = setTimeout(this.animateIn, ANIMATE_IN_TIME);
      return data;
    };
    this.triggerOnMouseLeave = (e) => {
      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(e);
      }
    };
    this.triggerOnMouseEnter = (e) => {
      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(e);
      }
    };
    this.onDocumentClick = (evt) => {
      const target = evt.composedPath ? evt.composedPath()[0] : evt.target;
      const popper = this.popperRef.current;
      const anchor = this.anchorRef.current;
      if (!popper || popper === target || target instanceof Node && popper.contains(target)) {
        return;
      }
      if (!anchor || anchor === target || target instanceof Node && popper.contains(target)) {
        return;
      }
      if (this.props.onClickOutside) {
        this.props.onClickOutside(evt);
      }
    };
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  componentDidUpdate(prevProps, prevState) {
    this.init(prevProps, prevState);
    if (this.props.autoFocus && !this.state.autoFocusAfterPositioning && this.popperRef.current !== null && this.popperRef.current.getBoundingClientRect().top > 0) {
      this.setState({ autoFocusAfterPositioning: true });
    }
    if (__DEV__ && !this.anchorRef.current) {
      console.warn(`[baseui][Popover] ref has not been passed to the Popper's anchor element.
              See how to pass the ref to an anchor element in the Popover example
              http://baseui.design/components/popover#anchor-ref-handling-example`);
    }
  }
  init(prevProps, prevState) {
    if (this.props.isOpen !== prevProps.isOpen || this.state.isMounted !== prevState.isMounted || this.state.isLayerMounted !== prevState.isLayerMounted) {
      if (this.props.isOpen && this.state.isLayerMounted) {
        this.clearTimers();
        return;
      }
      if (!this.props.isOpen && prevProps.isOpen) {
        this.animateOutTimer = setTimeout(this.animateOut, 20);
        return;
      }
    }
  }
  componentWillUnmount() {
    this.clearTimers();
  }
  getDefaultState(props) {
    return {
      isAnimating: false,
      arrowOffset: { left: 0, top: 0 },
      popoverOffset: { left: 0, top: 0 },
      placement: props.placement,
      isMounted: false,
      isLayerMounted: false,
      autoFocusAfterPositioning: false
    };
  }
  clearTimers() {
    for (const timerId of [
      this.animateInTimer,
      this.animateOutTimer,
      this.animateOutCompleteTimer,
      this.onMouseEnterTimer,
      this.onMouseLeaveTimer
    ]) {
      if (timerId) {
        clearTimeout(timerId);
      }
    }
  }
  triggerOnMouseLeaveWithDelay(e) {
    const { onMouseLeaveDelay } = this.props;
    if (onMouseLeaveDelay) {
      this.onMouseLeaveTimer = setTimeout(() => {
        return this.triggerOnMouseLeave(e);
      }, onMouseLeaveDelay);
      return;
    }
    this.triggerOnMouseLeave(e);
  }
  triggerOnMouseEnterWithDelay(e) {
    const { onMouseEnterDelay } = this.props;
    if (onMouseEnterDelay) {
      this.onMouseEnterTimer = setTimeout(() => {
        return this.triggerOnMouseEnter(e);
      }, onMouseEnterDelay);
      return;
    }
    this.triggerOnMouseEnter(e);
  }
  isClickTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.click;
  }
  isHoverTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.hover;
  }
  isAccessibilityTypeMenu() {
    return this.props.accessibilityType === ACCESSIBILITY_TYPE.menu;
  }
  isAccessibilityTypeTooltip() {
    return this.props.accessibilityType === ACCESSIBILITY_TYPE.tooltip;
  }
  getAnchorIdAttr() {
    const popoverId = this.getPopoverIdAttr();
    return popoverId ? `${popoverId}__anchor` : null;
  }
  getPopoverIdAttr() {
    return this.props.id || null;
  }
  getAnchorProps() {
    const { isOpen } = this.props;
    const anchorProps = {
      "aria-haspopup": "true",
      "aria-expanded": isOpen ? "true" : "false",
      key: "popover-anchor",
      ref: this.anchorRef
    };
    const popoverId = this.getPopoverIdAttr();
    if (this.isAccessibilityTypeMenu()) {
      const relationAttr = this.isClickTrigger() ? "aria-controls" : "aria-owns";
      anchorProps[relationAttr] = isOpen ? popoverId : null;
    } else if (this.isAccessibilityTypeTooltip()) {
      anchorProps.id = this.getAnchorIdAttr();
      anchorProps["aria-describedby"] = isOpen ? popoverId : null;
    }
    if (this.isHoverTrigger()) {
      anchorProps.onMouseEnter = this.onAnchorMouseEnter;
      anchorProps.onMouseLeave = this.onAnchorMouseLeave;
      anchorProps.onBlur = this.props.onBlur;
      anchorProps.onFocus = this.props.onFocus;
    } else {
      anchorProps.onClick = this.onAnchorClick;
    }
    return anchorProps;
  }
  getPopoverBodyProps() {
    const bodyProps = {};
    const popoverId = this.getPopoverIdAttr();
    if (this.isAccessibilityTypeMenu()) {
      bodyProps.id = popoverId;
    } else if (this.isAccessibilityTypeTooltip()) {
      bodyProps.id = popoverId;
      bodyProps.role = "tooltip";
    }
    if (this.isHoverTrigger()) {
      bodyProps.onMouseEnter = this.onPopoverMouseEnter;
      bodyProps.onMouseLeave = this.onPopoverMouseLeave;
    }
    return bodyProps;
  }
  getSharedProps() {
    const { isOpen, showArrow, popoverMargin = POPOVER_MARGIN } = this.props;
    const { isAnimating, arrowOffset, popoverOffset, placement } = this.state;
    return {
      $showArrow: !!showArrow,
      $arrowOffset: arrowOffset,
      $popoverOffset: popoverOffset,
      $placement: placement,
      $isAnimating: isAnimating,
      $animationDuration: this.props.animateOutTime || ANIMATE_OUT_TIME,
      $isOpen: isOpen,
      $popoverMargin: popoverMargin,
      $isHoverTrigger: this.isHoverTrigger()
    };
  }
  getAnchorFromChildren() {
    const { children } = this.props;
    const childArray = React.Children.toArray(children);
    if (childArray.length !== 1) {
      console.error(`[baseui] Exactly 1 child must be passed to Popover/Tooltip, found ${childArray.length} children`);
    }
    return childArray[0];
  }
  renderAnchor() {
    const anchor = this.getAnchorFromChildren();
    if (!anchor) {
      return null;
    }
    const isValidElement = React.isValidElement(anchor);
    const anchorProps = this.getAnchorProps();
    if (typeof anchor === "object" && isValidElement) {
      return React.cloneElement(anchor, anchorProps);
    }
    return <span {...anchorProps}>{anchor}</span>;
  }
  renderPopover(renderedContent) {
    const { showArrow, overrides = {} } = this.props;
    const { Arrow: ArrowOverride, Body: BodyOverride, Inner: InnerOverride } = overrides;
    const Arrow = getOverride(ArrowOverride) || StyledArrow;
    const Body = getOverride(BodyOverride) || StyledBody;
    const Inner = getOverride(InnerOverride) || StyledInner;
    const sharedProps = this.getSharedProps();
    const bodyProps = this.getPopoverBodyProps();
    return <Body key="popover-body" ref={this.popperRef} data-baseweb={this.props["data-baseweb"] || "popover"} {...bodyProps} {...sharedProps} {...getOverrideProps(BodyOverride)}>
      {showArrow ? <Arrow key="popover-arrow" ref={this.arrowRef} {...sharedProps} {...getOverrideProps(ArrowOverride)} /> : null}
      <Inner {...sharedProps} {...getOverrideProps(InnerOverride)}>{renderedContent}</Inner>
    </Body>;
  }
  renderContent() {
    const { content } = this.props;
    return typeof content === "function" ? content() : content;
  }
  render() {
    const mountedAndOpen = this.state.isMounted && (this.props.isOpen || this.state.isAnimating);
    const rendered = [this.renderAnchor()];
    const renderedContent = mountedAndOpen || this.props.renderAll ? this.renderContent() : null;
    const defaultPopperOptions = {
      modifiers: {
        preventOverflow: { enabled: !this.props.ignoreBoundary, padding: 0 }
      }
    };
    if (renderedContent) {
      if (mountedAndOpen) {
        rendered.push(<Layer key="new-layer" mountNode={this.props.mountNode} onEscape={this.props.onEsc} onDocumentClick={this.isHoverTrigger() ? void 0 : this.onDocumentClick} isHoverLayer={this.isHoverTrigger()} onMount={() => {
          return this.setState({ isLayerMounted: true });
        }} onUnmount={() => {
          return this.setState({ isLayerMounted: false });
        }}><TetherBehavior anchorRef={this.anchorRef.current} arrowRef={this.arrowRef.current} popperRef={this.popperRef.current} popperOptions={{
          ...defaultPopperOptions,
          ...this.props.popperOptions
        }} onPopperUpdate={this.onPopperUpdate} placement={this.state.placement}>{this.props.focusLock ? <FocusLock disabled={!this.props.focusLock} noFocusGuards={false} returnFocus={!this.isHoverTrigger() && this.props.returnFocus} autoFocus={this.state.autoFocusAfterPositioning} crossFrame={false} focusOptions={this.props.focusOptions}>{this.renderPopover(renderedContent)}</FocusLock> : <MoveFocusInside disabled={!this.props.autoFocus || !this.state.autoFocusAfterPositioning}>{this.renderPopover(renderedContent)}</MoveFocusInside>}</TetherBehavior></Layer>);
      } else {
        rendered.push(<Hidden key="hidden-layer">{renderedContent}</Hidden>);
      }
    }
    return rendered;
  }
}
PopoverInner.defaultProps = defaultProps;
const Popover = (props) => {
  const { innerRef } = props;
  const gID = useUID();
  return <PopoverInner id={props.id || gID} ref={innerRef} {...props} />;
};
Popover.defaultProps = defaultProps;
export default Popover;
