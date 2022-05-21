import * as React from "react";
import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
  POPOVER_MARGIN,
} from "./constants.js";
import StatefulContainer from "./stateful-container.js";
import Popover from "./popover.js";
import type { StatefulPopoverPropsT } from "./types.js";

function StatefulPopover(props: StatefulPopoverPropsT) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(popoverProps) => <Popover {...popoverProps}>{children}</Popover>}
    </StatefulContainer>
  );
}

StatefulPopover.defaultProps = {
  accessibilityType: ACCESSIBILITY_TYPE.menu,
  ignoreBoundary: false,
  overrides: {},
  onMouseEnterDelay: 200,
  onMouseLeaveDelay: 200,
  placement: PLACEMENT.auto,
  showArrow: false,
  triggerType: TRIGGER_TYPE.click,
  dismissOnClickOutside: true,
  dismissOnEsc: true,
  stateReducer: (_, nextState) => nextState,
  popoverMargin: POPOVER_MARGIN,
};

export default StatefulPopover;
