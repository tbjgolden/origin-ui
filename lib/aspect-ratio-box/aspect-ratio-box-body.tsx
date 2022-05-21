import * as React from "react";

import Block from "../block/block.js";
import type { BlockPropsT } from "../block/types.js";

export const AspectRatioBoxBody = ({
  position,
  top,
  bottom,
  width,
  ...restProps
}: $Exact<BlockPropsT>): React.Node => (
  <Block
    data-baseweb="aspect-ratio-box-body"
    position={position || "absolute"}
    top={top || 0}
    bottom={bottom || 0}
    width={width || "100%"}
    {...restProps}
  />
);

export default AspectRatioBoxBody;
