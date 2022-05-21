import deepMerge from "../../utils/deep-merge";
import { DarkTheme } from "../dark-theme/dark-theme";
import { typography as moveTypography, fontTokens as moveFontTokens } from "./typography";
import getTypography from "../shared/typography";
export const DarkThemeMove = deepMerge({}, DarkTheme, {
  name: "dark-theme-with-move",
  typography: deepMerge(getTypography(moveFontTokens), moveTypography),
});
