import * as React from "react";
import { ORIENTATION, FILL } from "./constants";

import type { FillT, OrientationT } from "./types";

export const getTabId = (uid: string, key: React.Key) => {
  return `tabs-${uid}-tab-${key}`;
};
export const getTabPanelId = (uid: string, key: React.Key) => {
  return `tabs-${uid}-tabpanel-${key}`;
};
export const isHorizontal = (orientation: OrientationT) => {
  return orientation === ORIENTATION.horizontal;
};
export const isVertical = (orientation: OrientationT) => {
  return orientation === ORIENTATION.vertical;
};
export const isRTL = (direction: string) => {
  return direction === "rtl";
};
export const isIntrinsic = (fill: FillT) => {
  return fill === FILL.intrinsic;
};
export const isFixed = (fill: FillT) => {
  return fill === FILL.fixed;
};
