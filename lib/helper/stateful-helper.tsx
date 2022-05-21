import {
  StatefulContainer,
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE
} from "../popover";
import { POPOVER_MARGIN } from "../popover/constants";
import { Helper } from "./helper";
export function StatefulHelper(props) {
  const { children, ...restProps } = props;
  return <StatefulContainer {...restProps}>{(helperProps) => {
    return <Helper {...helperProps}>{children}</Helper>;
  }}</StatefulContainer>;
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
  stateReducer: (_, nextState) => {
    return nextState;
  },
  popoverMargin: POPOVER_MARGIN
};
