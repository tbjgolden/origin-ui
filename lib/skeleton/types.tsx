

import type { OverrideT } from "../helpers/overrides.js";

export type OverridesT = {
  Row?: OverrideT,
  Root?: OverrideT,
};

export type SkeletonPropsT = {
  overrides?: OverridesT,
  /** Defines the number of row element in a skeleton */
  rows: number,
  /** Defines if the skeleton has an animation default is false*/
  animation: boolean,
  /** Defines the height of the skeleton container*/
  height?: string,
  /** Defines the width of the skeleton container*/
  width?: string,
};
