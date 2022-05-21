import * as React from "react";
import FocusLock from "react-focus-lock";
import { LocaleContext } from "../locale";
import { getOverrides } from "../helpers/overrides";
import { Layer } from "../layer";
import { SIZE, ROLE, CLOSE_SOURCE } from "./constants";
import {
  Root as StyledRoot,
  Dialog as StyledDialog,
  DialogContainer as StyledDialogContainer,
  Close as StyledClose,
} from "./styled-components";
import { CloseIcon } from "./close-icon";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
class Modal extends React.Component {
  constructor() {
    super(...arguments);
    this.dialogContainerRef = React.createRef();
    this.lastFocus = null;
    this.lastMountNodeOverflowStyle = null;
    this.rootRef = React.createRef();
    this.state = {
      isVisible: false,
      mounted: false,
      isFocusVisible: false,
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
    this.onDocumentClick = (e) => {
      if (
        e.target &&
        e.target instanceof HTMLElement &&
        e.target.contains(this.dialogContainerRef.current)
      ) {
        this.onBackdropClick();
      }
    };
    this.onBackdropClick = () => {
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
        isVisible: false,
      });
    };
  }
  componentDidMount() {
    this.setState({ mounted: true });
    if (__DEV__ && this.props.closable) {
      console.warn(
        "The property `closable` is not supported on the Modal. Did you mean `closeable`?"
      );
    }
  }
  componentWillUnmount() {
    this.resetMountNodeScroll();
    this.clearTimers();
  }
  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.props;
    if (
      isOpen !== prevProps.isOpen ||
      (isOpen && this.state.mounted && !prevState.mounted)
    ) {
      if (isOpen) {
        this.didOpen();
      } else {
        this.didClose();
      }
    }
  }
  disableMountNodeScroll() {
    const mountNode = this.getMountNode();
    this.lastMountNodeOverflowStyle = mountNode.style.overflow || "";
    mountNode.style.overflow = "hidden";
  }
  resetMountNodeScroll() {
    const mountNode = this.getMountNode();
    const lastStyle = this.lastMountNodeOverflowStyle;
    if (mountNode && lastStyle !== null) {
      if (mountNode.style.overflow === "hidden") {
        mountNode.style.overflow = lastStyle || "";
      }
      this.lastMountNodeOverflowStyle = null;
    }
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
    const rootRef = this.rootRef.current;
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
        closeSource: source,
      });
    }
  }
  getSharedProps() {
    const { animate, isOpen, size, role, closeable } = this.props;
    return {
      $animate: animate,
      $isVisible: this.state.isVisible,
      $isOpen: !!isOpen,
      $size: size,
      $role: role,
      $closeable: !!closeable,
      $isFocusVisible: this.state.isFocusVisible,
    };
  }
  getMountNode() {
    const { mountNode } = this.props;
    if (mountNode) {
      return mountNode;
    }
    return document.body;
  }
  getChildren() {
    const { children } = this.props;
    return typeof children === "function" ? children() : children;
  }
  renderModal() {
    const {
      overrides = {},
      closeable,
      role,
      autoFocus,
      focusLock,
      returnFocus,
    } = this.props;
    const {
      Root: RootOverride,
      Dialog: DialogOverride,
      DialogContainer: DialogContainerOverride,
      Close: CloseOverride,
    } = overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [DialogContainer, dialogContainerProps] = getOverrides(
      DialogContainerOverride,
      StyledDialogContainer
    );
    const [Dialog, dialogProps] = getOverrides(DialogOverride, StyledDialog);
    const [Close, closeProps] = getOverrides(CloseOverride, StyledClose);
    const sharedProps = this.getSharedProps();
    const children = this.getChildren();
    return (
      <LocaleContext.Consumer>
        {(locale) => {
          return (
            <FocusLock
              disabled={!focusLock}
              crossFrame={false}
              returnFocus={returnFocus}
              autoFocus={autoFocus}
            >
              <Root
                data-baseweb="modal"
                ref={this.rootRef}
                {...sharedProps}
                {...rootProps}
              >
                <DialogContainer
                  ref={this.dialogContainerRef}
                  {...sharedProps}
                  {...dialogContainerProps}
                >
                  <Dialog
                    tabIndex={-1}
                    aria-modal
                    aria-label="dialog"
                    role={role}
                    {...sharedProps}
                    {...dialogProps}
                  >
                    {children}
                    {closeable ? (
                      <Close
                        aria-label={locale.modal.close}
                        onClick={this.onCloseClick}
                        {...sharedProps}
                        {...closeProps}
                        onFocus={forkFocus(closeProps, this.handleFocus)}
                        onBlur={forkBlur(closeProps, this.handleBlur)}
                      >
                        <CloseIcon />
                      </Close>
                    ) : null}
                  </Dialog>
                </DialogContainer>
              </Root>
            </FocusLock>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
  render() {
    if (!this.state.mounted) {
      return null;
    }
    if (!this.props.isOpen && !this.state.isVisible) {
      return null;
    }
    return (
      <Layer
        onEscape={this.onEscape}
        onDocumentClick={this.onDocumentClick}
        mountNode={this.props.mountNode}
      >
        {this.renderModal()}
      </Layer>
    );
  }
}
Modal.defaultProps = {
  animate: true,
  autoFocus: true,
  focusLock: true,
  returnFocus: true,
  closeable: true,
  name: "dialog",
  isOpen: false,
  overrides: {},
  role: ROLE.dialog,
  size: SIZE.default,
};
export default Modal;
