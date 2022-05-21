import { SIZE } from "./constants.js";
import type { SizingT } from "../themes/types.js";

export type SizeT = $Keys<typeof SIZE>;

export type SpinnerPropsT = {
  /** Color of progress indicator */
  $color?: string;
  /** Width of the progress indicator "stroke".  */
  $borderWidth?: number | string | $Keys<SizingT> | SizeT;
  /** Height/width of the box the indicator will appear in. */
  $size?: number | string | $Keys<SizingT> | SizeT;
};
