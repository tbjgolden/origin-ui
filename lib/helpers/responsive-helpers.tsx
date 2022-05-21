import type { BreakpointsT } from "../styles/types";

/**
 * Helper function that generates media queries based on breakpoint, e.g.
 * getMediaQuery(720) => '@media screen and (min-width: 720px)'
 */
export const getMediaQuery = (breakpoint: number): string => {
  return `@media screen and (min-width: ${breakpoint}px)`;
};

export const getMediaQueries = (breakpoints: BreakpointsT): string[] => {
  return Object.keys(breakpoints)
    .map((key) => {
      return breakpoints[key];
    })
    .sort((a, b) => {
      return a - b;
    })
    .map(getMediaQuery);
};
