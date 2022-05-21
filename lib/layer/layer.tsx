import * as React from "react";
import ReactDOM from "react-dom";
import { styled } from "../styles";
import { LayersContext, Consumer } from "./layers-manager";
const Container = styled("div", ({ $zIndex }) => {
  return {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: $zIndex || null,
  };
});
class LayerComponent extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { container: null };
    this.onEscape = () => {
      if (this.props.onEscape) {
        this.props.onEscape();
      }
    };
    this.onDocumentClick = (event) => {
      if (this.props.onDocumentClick) {
        this.props.onDocumentClick(event);
      }
    };
  }
  componentDidMount() {
    this.context.addEscapeHandler(this.onEscape);
    if (!this.props.isHoverLayer) {
      this.context.addDocClickHandler(this.onDocumentClick);
    }
    const { onMount, mountNode, host: layersManagerHost } = this.props;
    if (mountNode) {
      onMount && onMount();
      return;
    }
    const hasLayersManager = layersManagerHost !== void 0;
    if (__DEV__ && !hasLayersManager) {
      console.warn(
        "`LayersManager` was not found. This occurs if you are attempting to use a component requiring `Layer` without using the `BaseProvider` at the root of your app. Please visit https://baseweb.design/components/base-provider/ for more information"
      );
    }
    const host = hasLayersManager ? layersManagerHost : document.body;
    if (host) {
      this.addContainer(host);
    }
  }
  componentDidUpdate(prevProps) {
    const { host, mountNode } = this.props;
    if (mountNode) {
      return;
    }
    if (host && host !== prevProps.host && prevProps.host === null) {
      this.addContainer(host);
    }
    if (prevProps.isHoverLayer != this.props.isHoverLayer) {
      if (this.props.isHoverLayer) {
        this.context.removeDocClickHandler(this.onDocumentClick);
      } else {
        this.context.addDocClickHandler(this.onDocumentClick);
      }
    }
  }
  componentWillUnmount() {
    this.context.removeEscapeHandler(this.onEscape);
    this.context.removeDocClickHandler(this.onDocumentClick);
    if (this.props.onUnmount) {
      this.props.onUnmount();
    }
    const host = this.props.host;
    const container = this.state.container;
    if (host && container && host.contains(container)) {
      container.remove();
    }
  }
  addContainer(host) {
    const { index, mountNode, onMount } = this.props;
    if (mountNode) {
      return;
    }
    if (host) {
      const container = host.ownerDocument.createElement("div");
      const sibling = typeof index === "number" ? host.children[index] : null;
      sibling ? host.insertBefore(container, sibling) : host.appendChild(container);
      this.setState({ container }, () => {
        onMount && onMount();
      });
    }
  }
  render() {
    const { container } = this.state;
    const { children, mountNode, zIndex } = this.props;
    const childrenToRender = zIndex ? (
      <Container $zIndex={zIndex}>{children}</Container>
    ) : (
      children
    );
    if (__BROWSER__) {
      if (mountNode) {
        return ReactDOM.createPortal(childrenToRender, mountNode);
      } else if (container) {
        return ReactDOM.createPortal(childrenToRender, container);
      }
      return null;
    }
    return null;
  }
}
LayerComponent.contextType = LayersContext;
export default function Layer(props) {
  return (
    <Consumer>
      {({ host, zIndex }) => {
        return <LayerComponent {...props} host={host} zIndex={zIndex} />;
      }}
    </Consumer>
  );
}
