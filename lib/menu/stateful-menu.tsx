/* eslint-disable react/prefer-stateless-function */
import * as React from "react";

import Menu from "./menu.js";
import { NestedMenuContext } from "./nested-menus.js";
import StatefulContainer from "./stateful-container.js";

import type { StatefulMenuPropsT } from "./types.js";

export default class StatefulMenu extends React.PureComponent<StatefulMenuPropsT> {
  render() {
    const { overrides, ...props } = this.props;
    return (
      <NestedMenuContext.Consumer>
        {(ctx) => (
          //$FlowExpectedError[cannot-spread-inexact]
          <StatefulContainer {...ctx} {...props}>
            {(renderProps) => <Menu {...renderProps} overrides={overrides} />}
          </StatefulContainer>
        )}
      </NestedMenuContext.Consumer>
    );
  }
}
