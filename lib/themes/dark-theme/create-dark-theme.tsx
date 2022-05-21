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

import type { PrimitivesT, ColorTokensT } from "../types";
import type { ThemeT } from "../../styles/types";

export default function createDarkTheme(
  // Used to derive typography and color theme properties
  primitives?: $Shape<PrimitivesT> = {},
  // Used to override default theme property values derived from primitives
  overrides?: {}
): ThemeT {
  // Extract font tokens and color tokens from primitives
  const { primaryFontFamily, ...customColorTokens } = primitives;
  // Assemble color tokens by overriding defaults with custom color tokens
  const colorTokens: ColorTokensT = {
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
    // If primaryFontFamily is not provided, we use our default font tokens
    typography: primaryFontFamily
      ? getTypography({ primaryFontFamily })
      : getTypography(),
    // TODO(#2318) Remove in v11, the next major version.
    // Do not use.
    zIndex: {
      modal: 2000,
    },
  };

  return deepMerge(theme, overrides);
}
