import animation from "../shared/animation";
import borders from "./borders";
import breakpoints from "../shared/breakpoints";
import deepMerge from "../../utils/deep-merge";
import defaultColorTokens from "./color-tokens";
import getComponentColorTokens from "./color-component-tokens";
import getSemanticColorTokens from "./color-semantic-tokens";
import getTypography from "../shared/typography";
import grid from "../shared/grid";
import lighting from "../shared/lighting";
import mediaQuery from "../shared/media-query";
import sizing from "../shared/sizing";
export default function createDarkTheme(primitives = {}, overrides) {
  const { primaryFontFamily, ...customColorTokens } = primitives;
  const colorTokens = {
    ...defaultColorTokens,
    ...customColorTokens,
  };
  const theme = {
    animation,
    borders,
    breakpoints,
    colors: {
      ...colorTokens,
      ...getComponentColorTokens(colorTokens),
      ...getSemanticColorTokens(colorTokens),
    },
    direction: "auto",
    grid,
    lighting,
    mediaQuery,
    sizing,
    typography: primaryFontFamily
      ? getTypography({ primaryFontFamily })
      : getTypography(),
    zIndex: {
      modal: 2e3,
    },
  };
  return deepMerge(theme, overrides);
}
