import colorTokens from "./color-tokens";
import getSemanticColorTokens from "./color-semantic-tokens";
import getComponentColorTokens from "./color-component-tokens";
import borders from "./borders";
import lighting from "../shared/lighting";
import getTypography from "../shared/typography";
import animation from "../shared/animation";
import breakpoints from "../shared/breakpoints";
import grid from "../shared/grid";
import mediaQuery from "../shared/media-query";
import sizing from "../shared/sizing";
export const DarkTheme = {
  name: "dark-theme",
  colors: {
    ...colorTokens,
    ...getComponentColorTokens(),
    ...getSemanticColorTokens(),
  },
  animation,
  breakpoints,
  borders,
  direction: "auto",
  grid,
  lighting,
  mediaQuery,
  sizing,
  typography: getTypography(),
  zIndex: {
    modal: 2e3,
  },
};
