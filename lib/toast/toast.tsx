import * as React from "react";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import DeleteIcon from "../icon/delete";
import {
  Body as StyledBody,
  CloseIconSvg as StyledCloseIcon,
  InnerContainer as StyledInnerContainer,
} from "./styled-components";
import { KIND, TYPE } from "./constants";
import { LocaleContext } from "../locale";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
class Toast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isRendered: true,
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
    this.animateIn = () => {
      this.animateInTimer = setTimeout(() => {
        this.setState({ isVisible: true });
      }, 0);
    };
    this.animateOut = (callback = () => {}) => {
      this.setState({ isVisible: false });
      this.animateOutCompleteTimer = setTimeout(() => {
        this.setState({ isRendered: false });
        callback();
      }, 600);
    };
    this.dismiss = () => {
      this.animateOut(this.props.onClose);
      if (this.props.autoFocus && this.previouslyFocusedElement) {
        this.previouslyFocusedElement.focus();
      }
    };
    this.onFocus = (e) => {
      if (!this.state.isVisible) return;
      clearTimeout(this.autoHideTimeout);
      clearTimeout(this.animateOutCompleteTimer);
      typeof this.props.onFocus === "function" && this.props.onFocus(e);
    };
    this.onMouseEnter = (e) => {
      if (!this.state.isVisible) return;
      clearTimeout(this.autoHideTimeout);
      clearTimeout(this.animateOutCompleteTimer);
      typeof this.props.onMouseEnter === "function" && this.props.onMouseEnter(e);
    };
    this.onBlur = (e) => {
      this.startTimeout();
      typeof this.props.onBlur === "function" && this.props.onBlur(e);
    };
    this.onMouseLeave = (e) => {
      this.startTimeout();
      typeof this.props.onMouseLeave === "function" && this.props.onMouseLeave(e);
    };
    this.closeRef = React.createRef();
    this.previouslyFocusedElement = null;
  }
  componentDidMount() {
    this.animateIn();
    this.startTimeout();
    if (
      __BROWSER__ &&
      this.props.autoFocus &&
      this.closeRef &&
      this.closeRef.current &&
      this.closeRef.current.focus &&
      typeof this.closeRef.current.focus === "function"
    ) {
      this.previouslyFocusedElement = document.activeElement;
      this.closeRef.current.focus();
      this.setState({ isFocusVisible: true });
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.autoHideDuration !== prevProps.autoHideDuration ||
      this.props.__updated !== prevProps.__updated
    ) {
      this.startTimeout();
    }
  }
  componentWillUnmount() {
    this.clearTimeout();
  }
  startTimeout() {
    if (this.props.autoHideDuration) {
      if (this.autoHideTimeout) {
        clearTimeout(this.autoHideTimeout);
      }
      this.autoHideTimeout = setTimeout(this.dismiss, this.props.autoHideDuration);
    }
  }
  clearTimeout() {
    for (const timerId of [
      this.autoHideTimeout,
      this.animateInTimer,
      this.animateOutCompleteTimer,
    ]) {
      if (timerId) {
        clearTimeout(timerId);
      }
    }
  }
  getSharedProps() {
    const { kind, notificationType, closeable } = this.props;
    const { isRendered, isVisible } = this.state;
    return {
      $kind: kind,
      $type: notificationType,
      $closeable: closeable,
      $isRendered: isRendered,
      $isVisible: isVisible,
    };
  }
  render() {
    const { children, closeable } = this.props;
    const { isRendered } = this.state;
    const {
      Body: BodyOverride,
      CloseIcon: CloseIconOverride,
      InnerContainer: InnerContainerOverride,
    } = this.props.overrides;
    const [Body, bodyProps] = getOverrides(BodyOverride, StyledBody);
    const [InnerContainer, innerContainerProps] = getOverrides(
      InnerContainerOverride,
      StyledInnerContainer
    );
    const [CloseIcon, closeIconProps] = getOverrides(CloseIconOverride, StyledCloseIcon);
    const closeIconOverrides = mergeOverrides(
      { Svg: { component: CloseIcon } },
      { Svg: CloseIconOverride }
    );
    const sharedProps = this.getSharedProps();
    if (!isRendered) {
      return null;
    }
    return (
      <LocaleContext.Consumer>
        {(locale) => {
          return (
            <Body
              role="alert"
              data-baseweb={this.props["data-baseweb"] || "toast"}
              {...sharedProps}
              {...bodyProps}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            >
              <InnerContainer {...sharedProps} {...innerContainerProps}>
                {typeof children === "function"
                  ? children({ dismiss: this.dismiss })
                  : children}
              </InnerContainer>
              {closeable ? (
                <DeleteIcon
                  ref={this.closeRef}
                  role="button"
                  tabIndex={0}
                  $isFocusVisible={this.state.isFocusVisible}
                  onClick={this.dismiss}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      this.dismiss();
                    }
                  }}
                  title={locale.toast.close}
                  {...sharedProps}
                  {...closeIconProps}
                  onFocus={forkFocus(closeIconProps, this.handleFocus)}
                  onBlur={forkBlur(closeIconProps, this.handleBlur)}
                  overrides={closeIconOverrides}
                />
              ) : null}
            </Body>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}
Toast.defaultProps = {
  autoFocus: false,
  autoHideDuration: 0,
  closeable: true,
  kind: KIND.info,
  notificationType: TYPE.toast,
  onClose: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  overrides: {},
};
export default Toast;
