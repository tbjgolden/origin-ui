import * as React from "react";
import { styled } from "../styles/index";
import { getOverrides } from "../helpers/overrides";
import type { LayersManagerPropsT, LayersManagerStateT, LayersContextT } from "./types";
import { initFocusVisible } from "../utils/focusVisible";

const StyledAppContainer = styled("div", {});
const StyledLayersContainer = styled("div", {});

function defaultEventHandlerFn() {
  if (__DEV__) {
    console.warn(
      "`LayersManager` was not found. This occurs if you are attempting to use a component requiring `Layer` without using the `BaseProvider` at the root of your app. Please visit https://baseweb.design/components/base-provider/ for more information"
    );
  }
}

export const LayersContext = React.createContext<LayersContextT>({
  addEscapeHandler: defaultEventHandlerFn,
  removeEscapeHandler: defaultEventHandlerFn,
  addDocClickHandler: defaultEventHandlerFn,
  removeDocClickHandler: defaultEventHandlerFn,
  host: undefined,
  zIndex: undefined,
});
export const Provider = LayersContext.Provider;
export const Consumer = LayersContext.Consumer;

export default class LayersManager extends React.Component<
  LayersManagerPropsT,
  LayersManagerStateT
> {
  host: {
    // flowlint-next-line unclear-type:off
    current: React.ElementRef<any> | null;
  } = React.createRef();

  containerRef: {
    // flowlint-next-line unclear-type:off
    current: React.ElementRef<any> | null;
  } = React.createRef();

  constructor(props: LayersManagerPropsT) {
    super(props);
    this.state = { escapeKeyHandlers: [], docClickHandlers: [] };
  }

  componentDidMount() {
    this.forceUpdate();
    initFocusVisible(this.containerRef.current);

    if (__BROWSER__) {
      document.addEventListener("keyup", this.onKeyUp);
      // using mousedown event so that callback runs before events on children inside of the layer
      document.addEventListener("mousedown", this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener("keyup", this.onKeyUp);
      document.removeEventListener("mousedown", this.onDocumentClick);
    }
  }

  onDocumentClick = (event: MouseEvent) => {
    const docClickHandler =
      this.state.docClickHandlers[this.state.docClickHandlers.length - 1];
    if (docClickHandler) {
      docClickHandler(event);
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      const escapeKeyHandler =
        this.state.escapeKeyHandlers[this.state.escapeKeyHandlers.length - 1];
      if (escapeKeyHandler) {
        escapeKeyHandler();
      }
    }
  };

  onAddEscapeHandler = (escapeKeyHandler: () => mixed) => {
    this.setState((prev) => {
      return { escapeKeyHandlers: [...prev.escapeKeyHandlers, escapeKeyHandler] };
    });
  };

  onRemoveEscapeHandler = (escapeKeyHandler: () => mixed) => {
    this.setState((prev) => {
      return {
        escapeKeyHandlers: prev.escapeKeyHandlers.filter((handler) => {
          return handler !== escapeKeyHandler;
        }),
      };
    });
  };

  onAddDocClickHandler = (docClickHandler: (event: MouseEvent) => mixed) => {
    this.setState((prev) => {
      return { docClickHandlers: [...prev.docClickHandlers, docClickHandler] };
    });
  };

  onRemoveDocClickHandler = (docClickHandler: (event: MouseEvent) => mixed) => {
    this.setState((prev) => {
      return {
        docClickHandlers: prev.docClickHandlers.filter((handler) => {
          return handler !== docClickHandler;
        }),
      };
    });
  };

  render() {
    const { overrides = {} } = this.props;
    const [AppContainer, appContainerProps] = getOverrides(
      overrides.AppContainer,
      StyledAppContainer
    );
    const [LayersContainer, layersContainerProps] = getOverrides(
      overrides.LayersContainer,
      StyledLayersContainer
    );
    return (
      <Consumer>
        {({ host }) => {
          if (__DEV__ && host !== undefined) {
            // eslint-disable-next-line no-console
            console.warn(
              "There is a LayersManager already exists in your application. It is not recommended to have more than one LayersManager in an application."
            );
          }
          return (
            <Provider
              value={{
                host: host || this.host.current,
                zIndex: this.props.zIndex,
                addEscapeHandler: this.onAddEscapeHandler,
                removeEscapeHandler: this.onRemoveEscapeHandler,
                addDocClickHandler: this.onAddDocClickHandler,
                removeDocClickHandler: this.onRemoveDocClickHandler,
              }}
            >
              <AppContainer {...appContainerProps} ref={this.containerRef}>
                {this.props.children}
              </AppContainer>
              <LayersContainer {...layersContainerProps} ref={this.host} />
            </Provider>
          );
        }}
      </Consumer>
    );
  }
}
