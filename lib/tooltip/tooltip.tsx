import * as React from "react";
import { Popover } from "../popover";
import { mergeOverrides } from "../helpers/overrides";
import baseDefaultProps from "./default-props";
import {
  Arrow as StyledArrow,
  Body as StyledBody,
  Inner as StyledInner,
} from "./styled-components";
class Tooltip extends React.Component {
  render() {
    const overrides = mergeOverrides(
      {
        Arrow: StyledArrow,
        Body: StyledBody,
        Inner: StyledInner,
      },
      this.props.overrides
    );
    return (
      <Popover
        autoFocus={false}
        data-baseweb="tooltip"
        {...this.props}
        overrides={overrides}
      />
    );
  }
}
Tooltip.defaultProps = {
  ...baseDefaultProps,
};
export default Tooltip;
