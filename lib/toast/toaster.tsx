import React from "react";
import ReactDOM from "react-dom";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import { KIND, PLACEMENT } from "./constants";
import {
  Root as StyledRoot,
  Body as StyledBody,
  CloseIconSvg as StyledCloseIcon,
  InnerContainer as StyledInnerContainer,
} from "./styled-components";
import Toast from "./toast";
let toasterRef = null;
export class ToasterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      toasts: [],
    };
    this.dismissHandlers = {};
    this.toastId = 0;
    this.getToastProps = (props2) => {
      const { autoFocus, autoHideDuration, closeable } = this.props;
      const key = props2.key || `toast-${this.toastId++}`;
      return { autoFocus, autoHideDuration, closeable, ...props2, key };
    };
    this.show = (props2 = {}) => {
      if (
        this.state.toasts
          .map((t) => {
            return t.key;
          })
          .includes(props2.key)
      ) {
        this.update(props2.key, props2);
        return props2.key;
      }
      const toastProps = this.getToastProps(props2);
      this.setState(({ toasts }) => {
        return { toasts: [...toasts, toastProps] };
      });
      return toastProps.key;
    };
    this.update = (key, props2) => {
      this.setState(({ toasts }) => {
        const updatedToasts = toasts.map((toast) => {
          if (toast.key === key) {
            const updatedToastProps = {
              ...toast,
              ...this.getToastProps({
                autoHideDuration: toast.autoHideDuration,
                ...props2,
              }),
              key,
              ...(this.props.resetAutoHideTimerOnUpdate
                ? { __updated: (Number.parseInt(toast.__updated) || 0) + 1 }
                : {}),
            };
            return updatedToastProps;
          }
          return toast;
        });
        return {
          toasts: updatedToasts,
        };
      });
    };
    this.dismiss = (key) => {
      if (this.dismissHandlers[key]) {
        this.dismissHandlers[key]();
      }
    };
    this.clearAll = () => {
      for (const key of Object.keys(this.dismissHandlers)) {
        this.dismissHandlers[key]();
      }
    };
    this.clear = (key) => {
      key === void 0 ? this.clearAll() : this.dismiss(key);
    };
    this.internalOnClose = (key) => {
      delete this.dismissHandlers[key];
      this.setState(({ toasts }) => {
        return {
          toasts: toasts.filter((t) => {
            return !(t.key === key);
          }),
        };
      });
    };
    this.getOnCloseHandler = (key, onClose) => {
      return () => {
        this.internalOnClose(key);
        typeof onClose === "function" && onClose();
      };
    };
    this.renderToast = (toastProps) => {
      const { onClose, children, key, ...restProps } = toastProps;
      const {
        ToastBody: BodyOverride,
        ToastCloseIcon: CloseIconOverride,
        ToastInnerContainer: InnerContainerOverride,
      } = this.props.overrides;
      const globalToastOverrides = mergeOverrides(
        {
          Body: StyledBody,
          CloseIcon: StyledCloseIcon,
          InnerContainer: StyledInnerContainer,
        },
        {
          Body: BodyOverride || {},
          CloseIcon: CloseIconOverride || {},
          InnerContainer: InnerContainerOverride || {},
        }
      );
      const toastOverrides = mergeOverrides(globalToastOverrides, toastProps.overrides);
      return (
        <Toast
          {...restProps}
          overrides={toastOverrides}
          key={key}
          onClose={this.getOnCloseHandler(key, onClose)}
        >
          {({ dismiss }) => {
            this.dismissHandlers[key] = dismiss;
            return children;
          }}
        </Toast>
      );
    };
    this.getSharedProps = () => {
      const { placement } = this.props;
      return {
        $placement: placement,
      };
    };
    toasterRef = this;
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  render() {
    const sharedProps = this.getSharedProps();
    const { Root: RootOverride } = this.props.overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const toastsLength = this.state.toasts.length;
    const toastsToRender = [];
    for (let i = toastsLength - 1; i >= 0; i--) {
      toastsToRender.push(this.renderToast(this.state.toasts[i]));
    }
    const root = (
      <Root data-baseweb="toaster" {...sharedProps} {...rootProps}>
        {toastsToRender}
      </Root>
    );
    return this.state.isMounted ? (
      <>
        {this.props.usePortal && __BROWSER__ && document.body
          ? ReactDOM.createPortal(root, document.body)
          : root}
        {this.props.children}
      </>
    ) : (
      <>{this.props.children}</>
    );
  }
}
ToasterContainer.defaultProps = {
  autoFocus: false,
  autoHideDuration: 0,
  children: null,
  closeable: true,
  overrides: {},
  placement: PLACEMENT.top,
  resetAutoHideTimerOnUpdate: true,
  usePortal: true,
};
const toaster = {
  getRef: function () {
    return toasterRef;
  },
  show: function (children, props = {}) {
    const toasterInstance = this.getRef();
    if (toasterInstance) {
      return toasterInstance.show({ ...props, children });
    } else if (__DEV__) {
      throw new Error(
        "Please make sure to add the ToasterContainer to your application, and it is mounted, before adding toasts! You can find more information here: https://baseweb.design/components/toast"
      );
    }
  },
  info: function (children, props = {}) {
    return this.show(children, { ...props, kind: KIND.info });
  },
  positive: function (children, props = {}) {
    return this.show(children, { ...props, kind: KIND.positive });
  },
  warning: function (children, props = {}) {
    return this.show(children, { ...props, kind: KIND.warning });
  },
  negative: function (children, props = {}) {
    return this.show(children, { ...props, kind: KIND.negative });
  },
  update: function (key, props) {
    const toasterInstance = this.getRef();
    if (toasterInstance) {
      toasterInstance.update(key, props);
    } else if (__DEV__) {
      console.error("No ToasterContainer is mounted yet.");
    }
  },
  clear: function (key) {
    const toasterInstance = this.getRef();
    if (toasterInstance) {
      toasterInstance.clear(key);
    } else if (__DEV__) {
      console.error("No ToasterContainer is mounted yet.");
    }
  },
};
export default toaster;
