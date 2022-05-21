

import type { BlockPropsT } from "../block/types.js";

export type AspectRatioBoxPropsT = {
  /** Aspect ratio is width divided by height. */
  +aspectRatio?: number,
} & BlockPropsT;
