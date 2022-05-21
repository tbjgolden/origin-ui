import deepMerge from "../../utils/deep-merge";
import { LightTheme } from "../light-theme/light-theme";
import { typography as moveTypography, fontTokens as moveFontTokens } from "./typography";
import getTypography from "../shared/typography";
export const LightThemeMove = deepMerge({}, LightTheme, {
  name: "light-theme-with-move",
  typography: deepMerge(getTypography(moveFontTokens), moveTypography)
});
