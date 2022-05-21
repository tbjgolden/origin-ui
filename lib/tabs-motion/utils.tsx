import { ORIENTATION, FILL } from "./constants";
export const getTabId = (uid, key) => {
  return `tabs-${uid}-tab-${key}`;
};
export const getTabPanelId = (uid, key) => {
  return `tabs-${uid}-tabpanel-${key}`;
};
export const isHorizontal = (orientation) => {
  return orientation === ORIENTATION.horizontal;
};
export const isVertical = (orientation) => {
  return orientation === ORIENTATION.vertical;
};
export const isRTL = (direction) => {
  return direction === "rtl";
};
export const isIntrinsic = (fill) => {
  return fill === FILL.intrinsic;
};
export const isFixed = (fill) => {
  return fill === FILL.fixed;
};
