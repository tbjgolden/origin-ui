
import { ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE } from "./constants.js";
import type { BaseTooltipPropsT } from "./types.js";

const baseDefaultProps: $Shape<BaseTooltipPropsT> = {
  accessibilityType: ACCESSIBILITY_TYPE.tooltip,
  focusLock: false,
  autoFocus: false,
  returnFocus: false,
  onMouseEnterDelay: 200,
  onMouseLeaveDelay: 200,
  overrides: {},
  placement: PLACEMENT.auto,
  popoverMargin: 0,
  showArrow: false,
  triggerType: TRIGGER_TYPE.hover,
  renderAll: false,
};

export default baseDefaultProps;
