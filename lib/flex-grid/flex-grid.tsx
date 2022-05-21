import * as React from "react";

import { Block } from "../block";
import { flattenFragments } from "../helpers/react-helpers";
import { getOverrides } from "../helpers/overrides";
import type { BlockPropsT } from "../block/types";
import type { FlexGridPropsT } from "./types";

export const BaseFlexGrid = React.forwardRef<BlockPropsT, HTMLElement>(
  ({ display, flexWrap, ...restProps }, ref) => (
    //$FlowFixMe
    <Block
      display={display || "flex"}
      flexWrap={flexWrap || flexWrap === false ? flexWrap : true}
      data-baseweb="flex-grid"
      {...restProps}
      ref={ref}
    />
  )
);
BaseFlexGrid.displayName = "BaseFlexGrid";

const FlexGrid = ({
  forwardedRef,
  children,
  as,
  overrides,
  flexGridColumnCount,
  flexGridColumnGap,
  flexGridRowGap,
  ...restProps
}): React.Node => {
  const [FlexGrid, flexGridProps] = getOverrides(
    overrides && overrides.Block,
    BaseFlexGrid
  );
  return (
    <FlexGrid
      // coerced to any because of how react components are typed.
      // cannot guarantee an html element
      ref={forwardedRef}
      as={as}
      {...restProps}
      {...flexGridProps}
    >
      {
        // flatten fragments so FlexGrid correctly iterates over fragments’ children
        flattenFragments(children).map(
          (
            child: React.Node,
            flexGridItemIndex: number,
            { length: flexGridItemCount }: React.Node[]
          ) => {
            // $FlowFixMe https://github.com/facebook/flow/issues/4864
            return React.cloneElement(child, {
              flexGridColumnCount,
              flexGridColumnGap,
              flexGridRowGap,
              flexGridItemIndex,
              flexGridItemCount,
            });
          }
        )
      }
    </FlexGrid>
  );
};

const FlexGridComponent = React.forwardRef<FlexGridPropsT, HTMLElement>(
  (props: FlexGridPropsT, ref) => <FlexGrid {...props} forwardedRef={ref} />
);
FlexGridComponent.displayName = "FlexGrid";
export default FlexGridComponent;
