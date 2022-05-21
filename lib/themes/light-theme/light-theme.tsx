
import colorTokens from "./color-tokens.js";
import getSemanticColorTokens from "./color-semantic-tokens.js";
import getComponentColorTokens from "./color-component-tokens.js";
import borders from "../shared/borders.js";
import lighting from "../shared/lighting.js";
import getTypography from "../shared/typography.js";
import animation from "../shared/animation.js";
import breakpoints from "../shared/breakpoints.js";
import grid from "../shared/grid.js";
import mediaQuery from "../shared/media-query.js";
import sizing from "../shared/sizing.js";

import type { ThemeT } from "../../styles/types.js";

export const LightTheme: ThemeT = {
  name: "light-theme",
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
  // TODO(#2318) Remove it in the next v11 major version.
  // Do not use.
  zIndex: {
    modal: 2000,
  },
};