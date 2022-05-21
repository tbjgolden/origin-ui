import * as React from "react";
import { getOverride, getOverrideProps } from "../helpers/overrides";
import { Root as StyledRoot } from "./styled-components";
class Component extends React.Component {
  getSharedProps() {
    const { prop } = this.props;
    return {
      $prop: Boolean(prop)
    };
  }
  render() {
    const { overrides = {}, children } = this.props;
    const { Root: RootOverride } = overrides;
    const Root = getOverride(RootOverride) || StyledRoot;
    const sharedProps = this.getSharedProps();
    return <Root data-baseweb="component" onClick={this.props.onClick} {...sharedProps} {...getOverrideProps(RootOverride)}>{children}</Root>;
  }
}
Component.defaultProps = {
  prop: true,
  onClick: () => {
  }
};
export default Component;
