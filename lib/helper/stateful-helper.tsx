import * as React from "react";

import {
  StatefulContainer,
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
} from "../popover/index.js";
import { POPOVER_MARGIN } from "../popover/constants.js";

import { Helper } from "./helper.js";
import type { StatefulPropsT } from "./types.js";

export function StatefulHelper(props: StatefulPropsT) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(helperProps) => <Helper {...helperProps}>{children}</Helper>}
    </StatefulContainer>
  );
}

StatefulHelper.defaultProps = {
  accessibilityType: ACCESSIBILITY_TYPE.menu,
  ignoreBoundary: false,
  overrides: {},
  onMouseEnterDelay: 200,
  onMouseLeaveDelay: 200,
  placement: PLACEMENT.bottom,
  showArrow: true,
  triggerType: TRIGGER_TYPE.click,
  dismissOnClickOutside: true,
  dismissOnEsc: true,
  stateReducer: (_, nextState) => nextState,
  popoverMargin: POPOVER_MARGIN,
};
