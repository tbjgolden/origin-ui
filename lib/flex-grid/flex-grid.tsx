import * as React from "react";
import { Block } from "../block";
import { flattenFragments } from "../helpers/react-helpers";
import { getOverrides } from "../helpers/overrides";
export const BaseFlexGrid = React.forwardRef(
  ({ display, flexWrap, ...restProps }, ref) => {
    return (
      <Block
        display={display || "flex"}
        flexWrap={flexWrap || flexWrap === false ? flexWrap : true}
        data-baseweb="flex-grid"
        {...restProps}
        ref={ref}
      />
    );
  }
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
}) => {
  const [FlexGrid2, flexGridProps] = getOverrides(
    overrides && overrides.Block,
    BaseFlexGrid
  );
  return (
    <FlexGrid2 ref={forwardedRef} as={as} {...restProps} {...flexGridProps}>
      {flattenFragments(children).map(
        (child, flexGridItemIndex, { length: flexGridItemCount }) => {
          return React.cloneElement(child, {
            flexGridColumnCount,
            flexGridColumnGap,
            flexGridRowGap,
            flexGridItemIndex,
            flexGridItemCount,
          });
        }
      )}
    </FlexGrid2>
  );
};
const FlexGridComponent = React.forwardRef((props, ref) => {
  return <FlexGrid {...props} forwardedRef={ref} />;
});
FlexGridComponent.displayName = "FlexGrid";
export default FlexGridComponent;
