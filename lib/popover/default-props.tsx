import { ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE } from "./constants";
const baseDefaultProps = {
  accessibilityType: ACCESSIBILITY_TYPE.menu,
  focusLock: false,
  autoFocus: true,
  returnFocus: true,
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
