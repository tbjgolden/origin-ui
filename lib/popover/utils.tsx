import { ARROW_SIZE, PLACEMENT } from "./constants";
const OPPOSITE_POSITIONS = {
  top: "bottom",
  bottom: "top",
  right: "left",
  left: "right"
};
export function getOppositePosition(position) {
  return OPPOSITE_POSITIONS[position];
}
export function isVerticalPosition(position) {
  return position === "top" || position === "bottom";
}
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function fromPopperPlacement(placement) {
  const popoverPlacement = placement.replace(/(top|bottom)-start$/, "$1Left").replace(/(top|bottom)-end$/, "$1Right").replace(/(left|right)-start$/, "$1Top").replace(/(left|right)-end$/, "$1Bottom");
  return PLACEMENT[popoverPlacement] || null;
}
export function splitPlacement(placement) {
  const matches = placement.match(/^([a-z]+)([A-Z][a-z]+)?/) || [];
  return matches.slice(1, 3).filter(Boolean).map((s) => {
    return s.toLowerCase();
  });
}
export function getPopoverMarginStyles(arrowSize, placement, popoverMargin) {
  const [position] = splitPlacement(placement);
  const opposite = getOppositePosition(position);
  if (!opposite) {
    return null;
  }
  const property = `margin${capitalize(opposite)}`;
  return {
    [property]: `${arrowSize + popoverMargin}px`
  };
}
export function getStartPosition(offset, placement, arrowSize, popoverMargin) {
  offset = { ...offset };
  const [position] = splitPlacement(placement);
  const margin = (arrowSize > 0 ? arrowSize : popoverMargin) * 2;
  if (isVerticalPosition(position)) {
    offset.top += position === "top" ? margin : -margin;
  } else {
    offset.left += position === "left" ? margin : -margin;
  }
  return `translate3d(${offset.left}px, ${offset.top}px, 0)`;
}
export function getEndPosition(offset) {
  return `translate3d(${offset.left}px, ${offset.top}px, 0)`;
}
export function getArrowPositionStyles(offsets, placement) {
  const [position] = splitPlacement(placement);
  const oppositePosition = getOppositePosition(position);
  if (!oppositePosition) {
    return null;
  }
  const alignmentProperty = isVerticalPosition(position) ? "left" : "top";
  return {
    [alignmentProperty]: `${offsets[alignmentProperty]}px`,
    [oppositePosition]: `-${ARROW_SIZE - 2}px`
  };
}
