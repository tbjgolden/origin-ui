import type { FontTokensT } from "../types";

export const fontTokens: FontTokensT = {
  primaryFontFamily:
    'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const secondaryFontFamily =
  'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

const monoFontFamily = 'UberMoveMono, "Lucida Console", Monaco, monospace';

export const typography = {
  font1450: { fontFamily: secondaryFontFamily },
  font1350: { fontFamily: secondaryFontFamily },
  font1250: { fontFamily: secondaryFontFamily },
  font1150: { fontFamily: secondaryFontFamily },
  DisplayLarge: { fontFamily: secondaryFontFamily },
  DisplayMedium: { fontFamily: secondaryFontFamily },
  DisplaySmall: { fontFamily: secondaryFontFamily },
  DisplayXSmall: { fontFamily: secondaryFontFamily },

  MonoParagraphXSmall: { fontFamily: monoFontFamily },
  MonoParagraphSmall: { fontFamily: monoFontFamily },
  MonoParagraphMedium: { fontFamily: monoFontFamily },
  MonoParagraphLarge: { fontFamily: monoFontFamily },
  MonoLabelXSmall: { fontFamily: monoFontFamily },
  MonoLabelSmall: { fontFamily: monoFontFamily },
  MonoLabelMedium: { fontFamily: monoFontFamily },
  MonoLabelLarge: { fontFamily: monoFontFamily },
  MonoHeadingXSmall: { fontFamily: monoFontFamily },
  MonoHeadingSmall: { fontFamily: monoFontFamily },
  MonoHeadingMedium: { fontFamily: monoFontFamily },
  MonoHeadingLarge: { fontFamily: monoFontFamily },
  MonoHeadingXLarge: { fontFamily: monoFontFamily },
  MonoHeadingXXLarge: { fontFamily: monoFontFamily },
  MonoDisplayXSmall: { fontFamily: monoFontFamily },
  MonoDisplaySmall: { fontFamily: monoFontFamily },
  MonoDisplayMedium: { fontFamily: monoFontFamily },
  MonoDisplayLarge: { fontFamily: monoFontFamily },
};
