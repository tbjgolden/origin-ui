import * as React from "react";
import { Block } from "../block";
import { mergeOverrides } from "../helpers/overrides";
import { getMediaQueries, getMediaQuery } from "../helpers/responsive-helpers";
export const flexGridItemMediaQueryStyle = ({
  $theme,
  flexGridColumnCount: colCount,
  flexGridColumnGap,
  flexGridRowGap,
  flexGridItemIndex: itemIndex,
  flexGridItemCount: itemCount
}) => {
  const colGap = $theme.sizing[flexGridColumnGap] || flexGridColumnGap || "0px";
  const colGapQuantity = Number.parseFloat(colGap);
  const colGapUnit = colGap.match(/[A-Za-z]+/)[0];
  const rowGap = $theme.sizing[flexGridRowGap] || flexGridRowGap || "0px";
  const rowGapQuantity = Number.parseFloat(rowGap);
  const widthCalc = `(100% - ${(colCount - 1) * colGapQuantity}${colGapUnit}) / ${colCount}`;
  const marginDirection = $theme.direction === "rtl" ? "marginLeft" : "marginRight";
  return Object.freeze({
    width: `calc(${widthCalc} - .5px)`,
    [marginDirection]: colGapQuantity && ((itemIndex + 1) % colCount !== 0 ? colGap : 0),
    marginBottom: rowGapQuantity && (Math.trunc(itemIndex / colCount) !== Math.trunc((itemCount - 1) / colCount) ? rowGap : 0),
    ...itemIndex === itemCount - 1 && (itemIndex + 1) % colCount !== 0 ? {
      [marginDirection]: `calc(${colCount - itemIndex % colCount - 1} * (${colGap} + ${widthCalc}))`
    } : {}
  });
};
export const getResponsiveValue = (responsive, i) => {
  if (!responsive) {
    return null;
  }
  if (!Array.isArray(responsive)) {
    return responsive;
  }
  return responsive[i] || responsive[responsive.length - 1];
};
export const flexGridItemStyle = ({
  $flexGridColumnCount,
  $flexGridColumnGap,
  $flexGridRowGap,
  $flexGridItemIndex,
  $flexGridItemCount,
  $theme
}) => {
  const baseFlexGridItemStyle = { flexGrow: 1 };
  const mediaQueries = getMediaQueries($theme.breakpoints);
  const maxResponsiveLength = Math.max(...[$flexGridColumnCount, $flexGridColumnGap, $flexGridRowGap].map((r) => {
    return Array.isArray(r) ? r.length : 0;
  }));
  if (maxResponsiveLength < 2) {
    return {
      ...baseFlexGridItemStyle,
      ...flexGridItemMediaQueryStyle({
        $theme,
        flexGridColumnCount: getResponsiveValue($flexGridColumnCount, 0) || 1,
        flexGridColumnGap: getResponsiveValue($flexGridColumnGap, 0) || 0,
        flexGridRowGap: getResponsiveValue($flexGridRowGap, 0) || 0,
        flexGridItemIndex: $flexGridItemIndex || 0,
        flexGridItemCount: $flexGridItemCount || 1
      })
    };
  }
  return [...new Array(maxResponsiveLength).keys()].reduce((acc, i) => {
    const [flexGridColumnCountValue, flexGridColumnGapValue, flexGridRowGapValue] = [
      $flexGridColumnCount,
      $flexGridColumnGap,
      $flexGridRowGap
    ].map((r) => {
      return getResponsiveValue(r, i);
    });
    const mediaQuery = i === 0 ? getMediaQuery(0) : mediaQueries[i - 1];
    if (mediaQuery) {
      acc[mediaQuery] = flexGridItemMediaQueryStyle({
        $theme,
        flexGridColumnCount: flexGridColumnCountValue || 1,
        flexGridColumnGap: flexGridColumnGapValue || 0,
        flexGridRowGap: flexGridRowGapValue || 0,
        flexGridItemIndex: $flexGridItemIndex || 0,
        flexGridItemCount: $flexGridItemCount || 1
      });
    }
    return acc;
  }, baseFlexGridItemStyle);
};
const FlexGridItem = ({
  forwardedRef,
  children,
  as,
  overrides,
  flexGridColumnCount,
  flexGridColumnGap,
  flexGridRowGap,
  flexGridItemIndex,
  flexGridItemCount,
  ...restProps
}) => {
  const flexGridItemOverrides = {
    Block: {
      style: flexGridItemStyle
    }
  };
  const blockOverrides = overrides ? mergeOverrides(flexGridItemOverrides, overrides) : flexGridItemOverrides;
  return <Block ref={forwardedRef} as={as} overrides={blockOverrides} $flexGridColumnCount={flexGridColumnCount} $flexGridColumnGap={flexGridColumnGap} $flexGridRowGap={flexGridRowGap} $flexGridItemIndex={flexGridItemIndex} $flexGridItemCount={flexGridItemCount} data-baseweb="flex-grid-item" {...restProps}>{children}</Block>;
};
const FlexGridItemComponent = React.forwardRef((props, ref) => {
  return <FlexGridItem {...props} forwardedRef={ref} />;
});
FlexGridItemComponent.displayName = "FlexGridItem";
export default FlexGridItemComponent;
