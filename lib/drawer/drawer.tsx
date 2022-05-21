import * as React from "react";
import FocusLock from "react-focus-lock";
import { LocaleContext } from "../locale";
import { getOverrides } from "../helpers/overrides";
import { Layer } from "../layer";
import { SIZE, CLOSE_SOURCE, ANCHOR } from "./constants";
import {
  StyledRoot,
  StyledBackdrop,
  StyledDrawerContainer,
  StyledDrawerBody,
  StyledClose,
  Hidden
} from "./styled-components";
import { CloseIcon } from "./close-icon";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
class Drawer extends React.Component {
  constructor() {
    super(...arguments);
    this.lastFocus = null;
    this.lastMountNodeOverflowStyle = null;
    this._refs = {};
    this.state = {
      isVisible: false,
      mounted: false,
      isFocusVisible: false
    };
    this.handleFocus = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisible: true });
      }
    };
    this.handleBlur = (event) => {
      if (this.state.isFocusVisible !== false) {
        this.setState({ isFocusVisible: false });
      }
    };
    this.onEscape = () => {
      if (!this.props.closeable) {
        return;
      }
      this.triggerClose(CLOSE_SOURCE.escape);
    };
    this.onBackdropClick = (event) => {
      if (this.props.onBackdropClick) {
        this.props.onBackdropClick(event);
      }
      if (!this.props.closeable) {
        return;
      }
      this.triggerClose(CLOSE_SOURCE.backdrop);
    };
    this.onCloseClick = () => {
      this.triggerClose(CLOSE_SOURCE.closeButton);
    };
    this.animateOutComplete = () => {
      this.setState({
        isVisible: false
      });
    };
  }
  componentDidMount() {
    this.setState({ mounted: true });
  }
  componentWillUnmount() {
    this.resetMountNodeScroll();
    this.clearTimers();
  }
  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.props;
    if (isOpen !== prevProps.isOpen || isOpen && this.state.mounted && !prevState.mounted) {
      if (isOpen) {
        this.didOpen();
      } else {
        this.didClose();
      }
    }
  }
  disableMountNodeScroll() {
    if (this.props.showBackdrop) {
      const mountNode = this.getMountNode();
      this.lastMountNodeOverflowStyle = mountNode.style.overflow || "";
      mountNode.style.overflow = "hidden";
    }
  }
  resetMountNodeScroll() {
    if (this.props.showBackdrop) {
      const mountNode = this.getMountNode();
      const lastStyle = this.lastMountNodeOverflowStyle;
      if (mountNode && lastStyle !== null) {
        mountNode.style.overflow = lastStyle || "";
        this.lastMountNodeOverflowStyle = null;
      }
    }
  }
  getMountNode() {
    const { mountNode } = this.props;
    if (mountNode) {
      return mountNode;
    }
    return document.body;
  }
  clearTimers() {
    if (this.animateOutTimer) {
      clearTimeout(this.animateOutTimer);
    }
    if (this.animateStartTimer) {
      cancelAnimationFrame(this.animateStartTimer);
    }
  }
  didOpen() {
    const rootRef = this.getRef("Root").current;
    if (rootRef) {
      rootRef.scrollTop = 0;
    }
    this.clearTimers();
    this.disableMountNodeScroll();
    this.animateStartTimer = requestAnimationFrame(() => {
      this.setState({ isVisible: true });
    });
  }
  didClose() {
    this.resetMountNodeScroll();
    this.animateOutTimer = setTimeout(this.animateOutComplete, 500);
  }
  triggerClose(source) {
    if (this.props.onClose && source) {
      this.props.onClose({
        closeSource: source
      });
    }
  }
  getSharedProps() {
    const { animate, isOpen, size, closeable, anchor, showBackdrop } = this.props;
    return {
      $animating: animate,
      $isVisible: this.state.isVisible,
      $isOpen: !!isOpen,
      $size: size,
      $closeable: !!closeable,
      $anchor: anchor,
      $isFocusVisible: this.state.isFocusVisible,
      $showBackdrop: showBackdrop
    };
  }
  getChildren() {
    const { children } = this.props;
    return typeof children === "function" ? children() : children;
  }
  getRef(component) {
    if (!this._refs[component]) {
      this._refs[component] = React.createRef();
    }
    return this._refs[component];
  }
  renderDrawer(renderedContent) {
    const { overrides = {}, closeable, autoFocus } = this.props;
    const {
      Root: RootOverride,
      DrawerContainer: DrawerContainerOverride,
      DrawerBody: DrawerBodyOverride,
      Backdrop: BackdropOverride,
      Close: CloseOverride
    } = overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [Backdrop, backdropProps] = getOverrides(BackdropOverride, StyledBackdrop);
    const [DrawerContainer, drawerContainerProps] = getOverrides(DrawerContainerOverride, StyledDrawerContainer);
    const [DrawerBody, drawerBodyProps] = getOverrides(DrawerBodyOverride, StyledDrawerBody);
    const [Close, closeProps] = getOverrides(CloseOverride, StyledClose);
    const sharedProps = this.getSharedProps();
    return <LocaleContext.Consumer>{(locale) => {
      return <FocusLock crossFrame={false} returnFocus autoFocus={autoFocus} noFocusGuards={true}><Root data-baseweb="drawer" ref={this.getRef("Root")} {...sharedProps} {...rootProps}>
        <Backdrop onClick={this.onBackdropClick} {...sharedProps} {...backdropProps} />
        <DrawerContainer {...sharedProps} {...drawerContainerProps}>
          <DrawerBody {...sharedProps} {...drawerBodyProps}>{renderedContent}</DrawerBody>
          {closeable ? <Close aria-label={locale.drawer.close} onClick={this.onCloseClick} {...sharedProps} {...closeProps} onFocus={forkFocus(closeProps, this.handleFocus)} onBlur={forkBlur(closeProps, this.handleBlur)}><CloseIcon title={locale.drawer.close} /></Close> : null}
        </DrawerContainer>
      </Root></FocusLock>;
    }}</LocaleContext.Consumer>;
  }
  render() {
    const mountedAndOpen = this.state.mounted && (this.props.isOpen || this.state.isVisible);
    const renderedContent = mountedAndOpen || this.props.renderAll ? this.getChildren() : null;
    if (renderedContent) {
      return mountedAndOpen ? <Layer onEscape={this.onEscape} mountNode={this.props.mountNode}>{this.renderDrawer(renderedContent)}</Layer> : <Hidden>{renderedContent}</Hidden>;
    }
    return null;
  }
}
Drawer.defaultProps = {
  animate: true,
  closeable: true,
  isOpen: false,
  overrides: {},
  size: SIZE.default,
  anchor: ANCHOR.right,
  showBackdrop: true,
  autoFocus: true,
  renderAll: false
};
export default Drawer;
