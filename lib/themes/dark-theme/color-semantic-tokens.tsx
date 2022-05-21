import colorTokens from "./color-tokens";
import { hexToRgb as hexToRgba } from "../../styles/util";
import colors from "../../tokens/colors";
export default (foundation = colorTokens) => {
  const core = {
    backgroundPrimary: foundation.primaryB,
    backgroundSecondary: colors.gray800,
    backgroundTertiary: colors.gray700,
    backgroundInversePrimary: foundation.primaryA,
    backgroundInverseSecondary: colors.gray300,
    contentPrimary: colors.white,
    contentSecondary: colors.gray300,
    contentTertiary: colors.gray400,
    contentInversePrimary: colors.black,
    contentInverseSecondary: colors.gray700,
    contentInverseTertiary: colors.gray600,
    borderOpaque: colors.gray700,
    borderTransparent: hexToRgba(foundation.primaryA, "0.08"),
    borderSelected: foundation.primaryA,
    borderInverseOpaque: colors.gray400,
    borderInverseTransparent: hexToRgba(foundation.primaryB, "0.2"),
    borderInverseSelected: foundation.primaryB
  };
  const coreExtensions = {
    backgroundStateDisabled: colors.gray800,
    backgroundOverlayDark: hexToRgba(colors.black, "0.3"),
    backgroundOverlayLight: hexToRgba(colors.black, "0.08"),
    backgroundAccent: foundation.accent,
    backgroundNegative: foundation.negative,
    backgroundWarning: foundation.warning,
    backgroundPositive: colors.green500,
    backgroundLightAccent: colors.blue700,
    backgroundLightPositive: colors.green700,
    backgroundLightNegative: colors.red700,
    backgroundLightWarning: colors.yellow700,
    backgroundAlwaysDark: colors.gray900,
    backgroundAlwaysLight: colors.gray100,
    contentStateDisabled: colors.gray600,
    contentAccent: colors.blue300,
    contentOnColor: colors.white,
    contentOnColorInverse: colors.black,
    contentNegative: colors.red300,
    contentWarning: colors.yellow300,
    contentPositive: colors.green300,
    borderStateDisabled: colors.gray800,
    borderAccent: colors.blue400,
    borderAccentLight: colors.blue500,
    borderNegative: colors.red500,
    borderWarning: colors.yellow500,
    borderPositive: colors.green500,
    safety: colors.blue400,
    eatsGreen400: colors.green400,
    freightBlue400: colors.cobalt400,
    jumpRed400: colors.red400,
    rewardsTier1: colors.blue400,
    rewardsTier2: colors.yellow400,
    rewardsTier3: colors.platinum400,
    rewardsTier4: colors.gray200,
    membership: colors.yellow600
  };
  return {
    ...core,
    ...coreExtensions
  };
};
