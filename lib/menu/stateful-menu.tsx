import * as React from "react";
import Menu from "./menu";
import { NestedMenuContext } from "./nested-menus";
import StatefulContainer from "./stateful-container";
export default class StatefulMenu extends React.PureComponent {
  render() {
    const { overrides, ...props } = this.props;
    return <NestedMenuContext.Consumer>{(ctx) => {
      return <StatefulContainer {...ctx} {...props}>{(renderProps) => {
        return <Menu {...renderProps} overrides={overrides} />;
      }}</StatefulContainer>;
    }}</NestedMenuContext.Consumer>;
  }
}
