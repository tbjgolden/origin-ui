

import * as React from "react";

import { Block } from "../block/index";
import { mergeOverrides } from "../helpers/overrides";
import type { AspectRatioBoxPropsT } from "./types";

const aspectRatioBoxStyle = ({ $aspectRatio }) => ({
  position: "relative",
  "::before": {
    content: '""',
    width: "1px",
    marginLeft: "-1px",
    float: "left",
    height: 0,
    paddingTop: `${100 / $aspectRatio}%`,
    pointerEvents: "none",
  },
  "::after": {
    content: '""',
    display: "table",
    clear: "both",
  },
});

const AspectRatioBox = ({
  forwardedRef,
  aspectRatio = 1,
  overrides = {},
  ...restProps
}: // flowlint-next-line unclear-type:off
AspectRatioBoxPropsT & { forwardedRef: any }): React.Node => {
  const aspectRatioBoxOverrides = {
    Block: {
      style: aspectRatioBoxStyle,
    },
  };
  const blockOverrides = mergeOverrides(aspectRatioBoxOverrides, overrides);
  return (
    <Block
      // coerced to any because of how react components are typed.
      // cannot guarantee an html element
      // flowlint-next-line unclear-type:off
      ref={(forwardedRef: any)}
      overrides={blockOverrides}
      $aspectRatio={aspectRatio}
      data-baseweb="aspect-ratio-box"
      {...restProps}
    />
  );
};

const AspectRatioBoxComponent = React.forwardRef<AspectRatioBoxPropsT, HTMLElement>(
  (props: AspectRatioBoxPropsT, ref) => <AspectRatioBox {...props} forwardedRef={ref} />
);
AspectRatioBoxComponent.displayName = "AspectRatioBox";
export default AspectRatioBoxComponent;
