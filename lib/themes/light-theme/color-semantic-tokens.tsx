import colorTokens from "./color-tokens";
import { hexToRgb as hexToRgba } from "../../styles/util";
import colors from "../../tokens/colors";
export default (foundation = colorTokens) => {
  const core = {
    backgroundPrimary: foundation.primaryB,
    backgroundSecondary: colors.gray50,
    backgroundTertiary: colors.gray100,
    backgroundInversePrimary: foundation.primaryA,
    backgroundInverseSecondary: colors.gray800,
    contentPrimary: foundation.primaryA,
    contentSecondary: colors.gray600,
    contentTertiary: colors.gray500,
    contentInversePrimary: foundation.primaryB,
    contentInverseSecondary: colors.gray300,
    contentInverseTertiary: colors.gray400,
    borderOpaque: colors.gray200,
    borderTransparent: hexToRgba(foundation.primaryA, "0.08"),
    borderSelected: foundation.primaryA,
    borderInverseOpaque: colors.gray700,
    borderInverseTransparent: hexToRgba(foundation.primaryB, "0.2"),
    borderInverseSelected: foundation.primaryB
  };
  const coreExtensions = {
    backgroundStateDisabled: colors.gray50,
    backgroundOverlayDark: hexToRgba(colors.black, "0.3"),
    backgroundOverlayLight: hexToRgba(colors.black, "0.08"),
    backgroundAccent: foundation.accent,
    backgroundNegative: foundation.negative,
    backgroundWarning: foundation.warning,
    backgroundPositive: colors.green400,
    backgroundLightAccent: colors.blue50,
    backgroundLightNegative: colors.red50,
    backgroundLightWarning: colors.yellow50,
    backgroundLightPositive: colors.green50,
    backgroundAlwaysDark: colors.black,
    backgroundAlwaysLight: colors.white,
    contentStateDisabled: colors.gray400,
    contentAccent: foundation.accent,
    contentOnColor: colors.white,
    contentOnColorInverse: colors.black,
    contentNegative: foundation.negative,
    contentWarning: colors.yellow600,
    contentPositive: colors.green400,
    borderStateDisabled: colors.gray50,
    borderAccent: colors.blue400,
    borderAccentLight: colors.blue200,
    borderNegative: colors.red200,
    borderWarning: colors.yellow200,
    borderPositive: colors.green200,
    safety: colors.blue400,
    eatsGreen400: colors.green400,
    freightBlue400: colors.cobalt400,
    jumpRed400: colors.red400,
    rewardsTier1: colors.blue400,
    rewardsTier2: colors.yellow400,
    rewardsTier3: colors.platinum400,
    rewardsTier4: colors.black,
    membership: colors.yellow600
  };
  return {
    ...core,
    ...coreExtensions
  };
};
