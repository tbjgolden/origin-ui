import * as React from "react";
import { styled } from "../styles";
import { getOverrides } from "../helpers/overrides";
import { initFocusVisible } from "../utils/focusVisible";
const StyledAppContainer = styled("div", {});
const StyledLayersContainer = styled("div", {});
function defaultEventHandlerFn() {
  if (__DEV__) {
    console.warn("`LayersManager` was not found. This occurs if you are attempting to use a component requiring `Layer` without using the `BaseProvider` at the root of your app. Please visit https://baseweb.design/components/base-provider/ for more information");
  }
}
export const LayersContext = React.createContext({
  addEscapeHandler: defaultEventHandlerFn,
  removeEscapeHandler: defaultEventHandlerFn,
  addDocClickHandler: defaultEventHandlerFn,
  removeDocClickHandler: defaultEventHandlerFn,
  host: void 0,
  zIndex: void 0
});
export const Provider = LayersContext.Provider;
export const Consumer = LayersContext.Consumer;
export default class LayersManager extends React.Component {
  constructor(props) {
    super(props);
    this.host = React.createRef();
    this.containerRef = React.createRef();
    this.onDocumentClick = (event) => {
      const docClickHandler = this.state.docClickHandlers[this.state.docClickHandlers.length - 1];
      if (docClickHandler) {
        docClickHandler(event);
      }
    };
    this.onKeyUp = (event) => {
      if (event.key === "Escape") {
        const escapeKeyHandler = this.state.escapeKeyHandlers[this.state.escapeKeyHandlers.length - 1];
        if (escapeKeyHandler) {
          escapeKeyHandler();
        }
      }
    };
    this.onAddEscapeHandler = (escapeKeyHandler) => {
      this.setState((prev) => {
        return { escapeKeyHandlers: [...prev.escapeKeyHandlers, escapeKeyHandler] };
      });
    };
    this.onRemoveEscapeHandler = (escapeKeyHandler) => {
      this.setState((prev) => {
        return {
          escapeKeyHandlers: prev.escapeKeyHandlers.filter((handler) => {
            return handler !== escapeKeyHandler;
          })
        };
      });
    };
    this.onAddDocClickHandler = (docClickHandler) => {
      this.setState((prev) => {
        return { docClickHandlers: [...prev.docClickHandlers, docClickHandler] };
      });
    };
    this.onRemoveDocClickHandler = (docClickHandler) => {
      this.setState((prev) => {
        return {
          docClickHandlers: prev.docClickHandlers.filter((handler) => {
            return handler !== docClickHandler;
          })
        };
      });
    };
    this.state = { escapeKeyHandlers: [], docClickHandlers: [] };
  }
  componentDidMount() {
    this.forceUpdate();
    initFocusVisible(this.containerRef.current);
    if (__BROWSER__) {
      document.addEventListener("keyup", this.onKeyUp);
      document.addEventListener("mousedown", this.onDocumentClick);
    }
  }
  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener("keyup", this.onKeyUp);
      document.removeEventListener("mousedown", this.onDocumentClick);
    }
  }
  render() {
    const { overrides = {} } = this.props;
    const [AppContainer, appContainerProps] = getOverrides(overrides.AppContainer, StyledAppContainer);
    const [LayersContainer, layersContainerProps] = getOverrides(overrides.LayersContainer, StyledLayersContainer);
    return <Consumer>{({ host }) => {
      if (__DEV__ && host !== void 0) {
        console.warn("There is a LayersManager already exists in your application. It is not recommended to have more than one LayersManager in an application.");
      }
      return <Provider value={{
        host: host || this.host.current,
        zIndex: this.props.zIndex,
        addEscapeHandler: this.onAddEscapeHandler,
        removeEscapeHandler: this.onRemoveEscapeHandler,
        addDocClickHandler: this.onAddDocClickHandler,
        removeDocClickHandler: this.onRemoveDocClickHandler
      }}>
        <AppContainer {...appContainerProps} ref={this.containerRef}>{this.props.children}</AppContainer>
        <LayersContainer {...layersContainerProps} ref={this.host} />
      </Provider>;
    }}</Consumer>;
  }
}
