import colorTokens from "./color-tokens";
import getSemanticColorTokens from "./color-semantic-tokens";
import getComponentColorTokens from "./color-component-tokens";
import borders from "../shared/borders";
import lighting from "../shared/lighting";
import getTypography from "../shared/typography";
import animation from "../shared/animation";
import breakpoints from "../shared/breakpoints";
import grid from "../shared/grid";
import mediaQuery from "../shared/media-query";
import sizing from "../shared/sizing";

import type { ThemeT } from "../../styles/types";

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
