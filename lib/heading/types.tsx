import * as React from "react";
import type { BlockPropsT } from "../block/types.js";

export type HeadingPropsT = {
  /** Set and fix the style level independently on the hierarchy context. */
  styleLevel?: number;
} & BlockPropsT;
export type HeadingLevelPropsT = {
  /** Content to be rendered in the HeadingLevel. */
  children: React.Node;
};
