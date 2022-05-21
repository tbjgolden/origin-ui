import React from "react";
import { StatefulContainer as StatefulPopoverContainer } from "../popover";
import baseDefaultProps from "./default-props";
class StatefulContainer extends React.Component {
  render() {
    return <StatefulPopoverContainer {...this.props} />;
  }
}
StatefulContainer.defaultProps = {
  ...baseDefaultProps,
};
export default StatefulContainer;
