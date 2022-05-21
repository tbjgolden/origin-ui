import * as React from "react";

import { getOverrides } from "../helpers/overrides";
import type { PropsT } from "./types";
import { Root as StyledRoot } from "./styled-components";

class HeaderNavigation extends React.Component<PropsT, {}> {
  static defaultProps = {
    overrides: {},
  };
  render() {
    const { overrides, ...restProps } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    return (
      <Root
        data-baseweb="header-navigation"
        role="navigation"
        {...restProps}
        {...rootProps}
      />
    );
  }
}

export default HeaderNavigation;
