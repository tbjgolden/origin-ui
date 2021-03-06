import tint from "polished/lib/color/tint";
import shade from "polished/lib/color/shade";
import { styled } from "../styles";
import { KIND, VARIANT, SIZE } from "./constants";
export function customOnRamp(color, unit) {
  switch (unit) {
    case "0":
      return "white";
    case "50":
      return tint(0.8, color);
    case "100":
      return tint(0.6, color);
    case "200":
      return tint(0.4, color);
    case "300":
      return tint(0.2, color);
    case "400":
      return color;
    case "500":
      return shade(0.2, color);
    case "600":
      return shade(0.4, color);
    case "700":
      return shade(0.6, color);
    case "800":
      return shade(0.8, color);
    case "1000":
      return "black";
    default:
      return color;
  }
}
const COLOR_STATE = {
  disabled: "disabled",
  solid: "solid",
  outline: "outline",
};
const neutralColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: theme.colors.tagNeutralFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagNeutralOutlinedDisabled,
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: theme.colors.tagNeutralSolidFont,
      backgroundColor: theme.colors.tagNeutralSolidBackground,
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: theme.colors.tagNeutralOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagNeutralOutlinedBackground,
    };
  },
};
const primaryColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: theme.colors.tagPrimaryFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagPrimaryOutlinedDisabled,
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: theme.colors.tagPrimarySolidFont,
      backgroundColor: theme.colors.tagPrimarySolidBackground,
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: theme.colors.tagPrimaryOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagPrimaryOutlinedBackground,
    };
  },
};
const accentColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: theme.colors.tagAccentFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagAccentOutlinedDisabled,
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: theme.colors.tagAccentSolidFont,
      backgroundColor: theme.colors.tagAccentSolidBackground,
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: theme.colors.tagAccentOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagAccentOutlinedBackground,
    };
  },
};
const positiveColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: theme.colors.tagPositiveFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagPositiveOutlinedDisabled,
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: theme.colors.tagPositiveSolidFont,
      backgroundColor: theme.colors.tagPositiveSolidBackground,
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: theme.colors.tagPositiveOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagPositiveOutlinedBackground,
    };
  },
};
const warningColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: theme.colors.tagWarningFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagWarningOutlinedDisabled,
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: theme.colors.tagWarningSolidFont,
      backgroundColor: theme.colors.tagWarningSolidBackground,
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: theme.colors.tagWarningOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagWarningOutlinedBackground,
    };
  },
};
const negativeColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: theme.colors.tagNegativeFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagNegativeOutlinedDisabled,
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: theme.colors.tagNegativeSolidFont,
      backgroundColor: theme.colors.tagNegativeSolidBackground,
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: theme.colors.tagNegativeOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagNegativeOutlinedBackground,
    };
  },
};
const orangeColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: "#FABDA5",
      backgroundColor: null,
      borderColor: "#FABDA5",
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: "#FFF",
      backgroundColor: "#FF6937",
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: "#FF6937",
      backgroundColor: null,
      borderColor: "#FABDA5",
    };
  },
};
const purpleColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: "#C1B4E2",
      backgroundColor: null,
      borderColor: "#C1B4E2",
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: "#FFF",
      backgroundColor: "#7356BF",
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: "#7356BF",
      backgroundColor: null,
      borderColor: "#C1B4E2",
    };
  },
};
const brownColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: "#D2BBB0",
      backgroundColor: null,
      borderColor: "#D2BBB0",
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: "#FFF",
      backgroundColor: "#99644C",
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: "#99644C",
      backgroundColor: null,
      borderColor: "#D2BBB0",
    };
  },
};
const customColorStates = {
  [COLOR_STATE.disabled]: (theme, color) => {
    return {
      color: customOnRamp(color, theme.colors.tagFontDisabledRampUnit),
      backgroundColor: null,
      borderColor: customOnRamp(color, theme.colors.tagSolidDisabledRampUnit),
    };
  },
  [COLOR_STATE.solid]: (theme, color) => {
    return {
      color: customOnRamp(color, theme.colors.tagSolidFontRampUnit),
      backgroundColor: customOnRamp(color, theme.colors.tagSolidRampUnit),
      borderColor: null,
    };
  },
  [COLOR_STATE.outline]: (theme, color) => {
    return {
      color: customOnRamp(color, theme.colors.tagOutlinedFontRampUnit),
      backgroundColor: null,
      borderColor: customOnRamp(color, theme.colors.tagOutlinedRampUnit),
    };
  },
};
const colorMap = {
  [KIND.neutral]: neutralColorStates,
  [KIND.primary]: primaryColorStates,
  [KIND.accent]: accentColorStates,
  [KIND.positive]: positiveColorStates,
  [KIND.warning]: warningColorStates,
  [KIND.negative]: negativeColorStates,
  [KIND.black]: primaryColorStates,
  [KIND.blue]: accentColorStates,
  [KIND.green]: positiveColorStates,
  [KIND.red]: negativeColorStates,
  [KIND.yellow]: warningColorStates,
  [KIND.orange]: orangeColorStates,
  [KIND.purple]: purpleColorStates,
  [KIND.brown]: brownColorStates,
  [KIND.custom]: customColorStates,
};
const getColorStateFromProps = (props) => {
  if (props.$disabled) return COLOR_STATE.disabled;
  if (props.$variant === VARIANT.solid) return COLOR_STATE.solid;
  return COLOR_STATE.outline;
};
export const Action = styled("span", (props) => {
  const { $theme, $disabled, $size = SIZE.small } = props;
  return {
    alignItems: "center",
    borderBottomRightRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : 0,
    borderTopRightRadius: $theme.borders.useRoundedCorners ? $theme.borders.radius400 : 0,
    cursor: $disabled ? "not-allowed" : "pointer",
    display: "flex",
    marginLeft: {
      [SIZE.small]: "8px",
      [SIZE.medium]: "12px",
      [SIZE.large]: "16px",
    }[$size],
    outline: "none",
    transitionProperty: "all",
    transitionDuration: "background-color",
    transitionTimingFunction: $theme.animation.easeOutCurve,
  };
});
export const StartEnhancerContainer = styled("div", ({ $theme, $size = SIZE.small }) => {
  let paddingMagnitude = $theme.sizing.scale300;
  if ($size === SIZE.medium) {
    paddingMagnitude = $theme.sizing.scale400;
  } else if ($size === SIZE.large) {
    paddingMagnitude = $theme.sizing.scale600;
  }
  return {
    alignItems: "center",
    display: "flex",
    paddingRight: paddingMagnitude,
  };
});
export const Text = styled("span", (props) => {
  const { $theme } = props;
  return {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: props.$theme.sizing.scale3200,
    order: 0,
  };
});
export const Root = styled("span", (props) => {
  const {
    $theme,
    $kind = KIND.primary,
    $clickable,
    $variant,
    $disabled,
    $closeable,
    $isFocusVisible,
    $color,
    $size = SIZE.small,
  } = props;
  const borderRadius = $theme.borders.tagBorderRadius;
  const paddingMagnitude = {
    [SIZE.small]: $theme.sizing.scale300,
    [SIZE.medium]: $theme.sizing.scale500,
    [SIZE.large]: $theme.sizing.scale600,
  }[$size];
  const borderWidth = !$disabled && $variant === VARIANT.solid ? 0 : "2px";
  const { color, backgroundColor, borderColor } = colorMap[$kind][
    getColorStateFromProps(props)
  ]($theme, $color);
  return {
    ...{
      [SIZE.small]: $theme.typography.LabelSmall,
      [SIZE.medium]: $theme.typography.LabelMedium,
      [SIZE.large]: $theme.typography.LabelLarge,
    }[$size],
    alignItems: "center",
    color,
    backgroundColor,
    borderLeftColor: borderColor,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    borderLeftStyle: "solid",
    borderRightStyle: "solid",
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderTopWidth: borderWidth,
    borderBottomWidth: borderWidth,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    boxSizing: "border-box",
    cursor: $disabled ? "not-allowed" : $clickable ? "pointer" : "default",
    display: "inline-flex",
    height: {
      [SIZE.small]: "24px",
      [SIZE.medium]: "32px",
      [SIZE.large]: "40px",
    }[$size],
    justifyContent: "space-between",
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "5px",
    marginRight: "5px",
    paddingTop: $theme.sizing.scale0,
    paddingBottom: $theme.sizing.scale0,
    paddingLeft: paddingMagnitude,
    paddingRight: paddingMagnitude,
    outline: "none",
    ":hover":
      $disabled || !$clickable
        ? {}
        : {
            boxShadow: `inset 0px 0px 100px rgba(0, 0, 0, 0.08)`,
          },
    ":focus":
      $disabled || (!$clickable && !$closeable)
        ? {}
        : {
            boxShadow: $isFocusVisible
              ? `0 0 0 3px ${
                  $kind === KIND.accent ? $theme.colors.primaryA : $theme.colors.accent
                }`
              : "none",
          },
  };
});
