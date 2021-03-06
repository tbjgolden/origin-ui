import { ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE, POPOVER_MARGIN } from "./constants";
import StatefulContainer from "./stateful-container";
import Popover from "./popover";
function StatefulPopover(props) {
  const { children, ...restProps } = props;
  return (
    <StatefulContainer {...restProps}>
      {(popoverProps) => {
        return <Popover {...popoverProps}>{children}</Popover>;
      }}
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
  stateReducer: (_, nextState) => {
    return nextState;
  },
  popoverMargin: POPOVER_MARGIN,
};
export default StatefulPopover;
