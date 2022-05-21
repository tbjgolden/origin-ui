import type { TetherPlacementT, PopperOffsetT, NormalizedOffsetT } from "./types";

export function toPopperPlacement(placement: TetherPlacementT): string {
  return placement.replace(/(Top|Left)$/, "-start").replace(/(Right|Bottom)$/, "-end");
}

/**
 * Takes the offset passed from popper.js and normalizes it
 */
export function parsePopperOffset(offset: PopperOffsetT): NormalizedOffsetT {
  return {
    top: Math.floor(offset.top || 0),
    left: Math.floor(offset.left || 0),
  };
}
