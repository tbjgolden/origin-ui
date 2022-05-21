export const getMediaQuery = (breakpoint) => {
  return `@media screen and (min-width: ${breakpoint}px)`;
};
export const getMediaQueries = (breakpoints) => {
  return Object.keys(breakpoints).map((key) => {
    return breakpoints[key];
  }).sort((a, b) => {
    return a - b;
  }).map(getMediaQuery);
};
