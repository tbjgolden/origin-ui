
import { ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE } from "./constants.js";
import type { BasePopoverPropsT } from "./types.js";

const baseDefaultProps: $Shape<BasePopoverPropsT> = {
  accessibilityType: ACCESSIBILITY_TYPE.menu,
  focusLock: false,
  autoFocus: true,
  returnFocus: true,
  // Remove the `ignoreBoundary` prop in the next major version
  // and have it replaced with the TetherBehavior props overrides
  ignoreBoundary: false,
  overrides: {},
  onMouseEnterDelay: 200,
  onMouseLeaveDelay: 200,
  placement: PLACEMENT.auto,
  showArrow: false,
  triggerType: TRIGGER_TYPE.click,
  renderAll: false,
};

export default baseDefaultProps;
