/* eslint-disable react/no-find-dom-node */
import * as React from "react";
import { Popover } from "../popover/index.js";
import { mergeOverrides } from "../helpers/overrides.js";
import baseDefaultProps from "./default-props.js";
import type { TooltipPropsT } from "./types.js";
import {
  Arrow as StyledArrow,
  Body as StyledBody,
  Inner as StyledInner,
} from "./styled-components.js";

class Tooltip extends React.Component<TooltipPropsT> {
  static defaultProps: $Shape<TooltipPropsT> = {
    ...baseDefaultProps,
  };

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

export default Tooltip;
