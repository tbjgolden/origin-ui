/* eslint-disable react/prefer-stateless-function */
import * as React from "react";

import Menu from "./menu";
import { NestedMenuContext } from "./nested-menus";
import StatefulContainer from "./stateful-container";

import type { StatefulMenuPropsT } from "./types";

export default class StatefulMenu extends React.PureComponent<StatefulMenuPropsT> {
  render() {
    const { overrides, ...props } = this.props;
    return (
      <NestedMenuContext.Consumer>
        {(ctx) => {
          return (
            //$FlowExpectedError[cannot-spread-inexact]
            <StatefulContainer {...ctx} {...props}>
              {(renderProps) => {
                return <Menu {...renderProps} overrides={overrides} />;
              }}
            </StatefulContainer>
          );
        }}
      </NestedMenuContext.Consumer>
    );
  }
}
