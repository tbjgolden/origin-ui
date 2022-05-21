import { styled } from "../styles";
import getDayStateCode from "./utils/day-state";
import { ORIENTATION, DENSITY, INPUT_ROLE } from "./constants";
export const StyledInputWrapper = styled("div", (props) => {
  const { $separateRangeInputs } = props;
  return {
    width: "100%",
    ...($separateRangeInputs ? { display: "flex", justifyContent: "center" } : {}),
  };
});
export const StyledInputLabel = styled("div", ({ $theme }) => {
  return {
    ...$theme.typography.LabelMedium,
    marginBottom: $theme.sizing.scale300,
  };
});
export const StyledStartDate = styled("div", ({ $theme }) => {
  return {
    width: "100%",
    marginRight: $theme.sizing.scale300,
  };
});
export const StyledEndDate = styled("div", ({ $theme }) => {
  return {
    width: "100%",
  };
});
export const StyledRoot = styled("div", (props) => {
  const {
    $theme: { typography, colors, borders },
  } = props;
  return {
    ...typography.font200,
    color: colors.calendarForeground,
    backgroundColor: colors.calendarBackground,
    textAlign: "center",
    borderTopLeftRadius: borders.surfaceBorderRadius,
    borderTopRightRadius: borders.surfaceBorderRadius,
    borderBottomRightRadius: borders.surfaceBorderRadius,
    borderBottomLeftRadius: borders.surfaceBorderRadius,
    display: "inline-block",
  };
});
export const StyledMonthContainer = styled("div", (props) => {
  const { $orientation } = props;
  return {
    display: "flex",
    flexDirection: $orientation === ORIENTATION.vertical ? "column" : "row",
  };
});
export const StyledCalendarContainer = styled("div", (props) => {
  const {
    $theme: { sizing },
    $density,
  } = props;
  return {
    paddingTop: sizing.scale300,
    paddingBottom: $density === DENSITY.high ? sizing.scale400 : sizing.scale300,
    paddingLeft: sizing.scale500,
    paddingRight: sizing.scale500,
  };
});
export const StyledSelectorContainer = styled("div", ({ $theme }) => {
  const textAlign = $theme.direction === "rtl" ? "right" : "left";
  return {
    marginBottom: $theme.sizing.scale600,
    paddingLeft: $theme.sizing.scale600,
    paddingRight: $theme.sizing.scale600,
    textAlign,
  };
});
export const StyledCalendarHeader = styled("div", (props) => {
  const {
    $theme: { typography, borders, colors, sizing },
    $density,
  } = props;
  return {
    ...($density === DENSITY.high ? typography.LabelMedium : typography.LabelLarge),
    color: colors.calendarHeaderForeground,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale600,
    paddingRight: sizing.scale600,
    backgroundColor: colors.calendarHeaderBackground,
    borderTopLeftRadius: borders.surfaceBorderRadius,
    borderTopRightRadius: borders.surfaceBorderRadius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    minHeight:
      $density === DENSITY.high
        ? `calc(${sizing.scale800} + ${sizing.scale0})`
        : sizing.scale950,
  };
});
export const StyledMonthHeader = styled("div", (props) => {
  return {
    color: props.$theme.colors.calendarHeaderForeground,
    backgroundColor: props.$theme.colors.calendarHeaderBackground,
    whiteSpace: "nowrap",
  };
});
export const StyledMonthYearSelectButton = styled("button", (props) => {
  const {
    $theme: { typography, colors },
    $isFocusVisible,
    $density,
  } = props;
  return {
    ...($density === DENSITY.high ? typography.LabelMedium : typography.LabelLarge),
    alignItems: "center",
    backgroundColor: "transparent",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    color: colors.calendarHeaderForeground,
    cursor: "pointer",
    display: "flex",
    outline: "none",
    ":focus": {
      boxShadow: $isFocusVisible ? `0 0 0 3px ${colors.accent}` : "none",
    },
  };
});
export const StyledMonthYearSelectIconContainer = styled("span", (props) => {
  const marginDirection = props.$theme.direction === "rtl" ? "marginRight" : "marginLeft";
  return {
    alignItems: "center",
    display: "flex",
    [marginDirection]: props.$theme.sizing.scale500,
  };
});
function getArrowBtnStyle({ $theme, $disabled, $isFocusVisible }) {
  return {
    boxSizing: "border-box",
    display: "flex",
    color: $disabled
      ? $theme.colors.calendarHeaderForegroundDisabled
      : $theme.colors.calendarHeaderForeground,
    cursor: $disabled ? "default" : "pointer",
    backgroundColor: "transparent",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    paddingRight: "0",
    marginBottom: 0,
    marginTop: 0,
    outline: "none",
    ":focus": $disabled
      ? {}
      : {
          boxShadow: $isFocusVisible ? `0 0 0 3px ${$theme.colors.accent}` : "none",
        },
  };
}
export const StyledPrevButton = styled("button", getArrowBtnStyle);
export const StyledNextButton = styled("button", getArrowBtnStyle);
export const StyledMonth = styled("div", (props) => {
  return {
    display: "inline-block",
  };
});
export const StyledWeek = styled("div", (props) => {
  const {
    $theme: { sizing },
  } = props;
  return {
    whiteSpace: "nowrap",
    display: "flex",
    marginBottom: sizing.scale0,
  };
});
function generateDayStyles(defaultCode, defaultStyle) {
  const codeForSM = defaultCode.slice(0, 12) + "1" + defaultCode.slice(12 + 1);
  const codeForEM = defaultCode.slice(0, 13) + "1" + defaultCode.slice(13 + 1);
  return {
    [defaultCode]: defaultStyle,
    [codeForSM]: defaultStyle,
    [codeForEM]: defaultStyle,
  };
}
function getDayStyles(code, { colors }) {
  const undefinedDayStyle = {
    ":before": { content: null },
    ":after": { content: null },
  };
  let defaultDayStyle = undefinedDayStyle;
  const disabledDateStyle = {
    color: colors.calendarForegroundDisabled,
    ":before": { content: null },
    ":after": { content: null },
  };
  const outsideMonthDateStyle = {
    color: colors.calendarForegroundDisabled,
    ":before": {
      borderTopStyle: "none",
      borderBottomStyle: "none",
      borderLeftStyle: "none",
      borderRightStyle: "none",
      backgroundColor: "transparent",
    },
    ":after": {
      borderTopLeftRadius: "0%",
      borderTopRightRadius: "0%",
      borderBottomLeftRadius: "0%",
      borderBottomRightRadius: "0%",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderRightColor: "transparent",
      borderLeftColor: "transparent",
    },
  };
  const highlightedStyle = {
    ":before": { content: null },
  };
  const CODE_DISABLED_INDEX = 1;
  if (code && code[CODE_DISABLED_INDEX] === "1") {
    defaultDayStyle = disabledDateStyle;
  }
  const dayStateStyle = Object.assign(
    {},
    generateDayStyles("001000000000000", {
      color: colors.calendarDayForegroundPseudoSelected,
    }),
    generateDayStyles("000100000000000", {
      color: colors.calendarDayForegroundSelected,
    }),
    generateDayStyles("001100000000000", {
      color: colors.calendarDayForegroundSelectedHighlighted,
    }),
    {
      "010000000000000": {
        color: colors.calendarForegroundDisabled,
        ":after": { content: null },
      },
    },
    {
      "011000000000000": {
        color: colors.calendarForegroundDisabled,
        ":after": { content: null },
      },
    },
    generateDayStyles("000000000000001", outsideMonthDateStyle),
    generateDayStyles("101000000000000", highlightedStyle),
    generateDayStyles("101010000000000", highlightedStyle),
    generateDayStyles("100100000000000", {
      color: colors.calendarDayForegroundSelected,
    }),
    generateDayStyles("101100000000000", {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ":before": { content: null },
    }),
    generateDayStyles("100111100000000", {
      color: colors.calendarDayForegroundSelected,
      ":before": { content: null },
    }),
    generateDayStyles("101111100000000", {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ":before": { content: null },
    }),
    generateDayStyles("100111000000000", {
      color: colors.calendarDayForegroundSelected,
    }),
    generateDayStyles("100110100000000", {
      color: colors.calendarDayForegroundSelected,
      ":before": { left: null, right: "50%" },
    }),
    generateDayStyles("100100001010000", {
      color: colors.calendarDayForegroundSelected,
    }),
    generateDayStyles("100100001001000", {
      color: colors.calendarDayForegroundSelected,
      ":before": { left: null, right: "50%" },
    }),
    generateDayStyles("101000001010000", {
      ":before": { left: null, right: "50%" },
    }),
    { "101000001001000": {} },
    { "101000001001100": {} },
    { "101000001001010": {} },
    generateDayStyles("100010010000000", {
      color: colors.calendarDayForegroundPseudoSelected,
      ":before": { left: "0", width: "100%" },
      ":after": { content: null },
    }),
    {
      "101000001100000": {
        color: colors.calendarDayForegroundPseudoSelected,
        ":before": {
          left: "0",
          width: "100%",
        },
        ":after": {
          content: null,
        },
      },
    },
    generateDayStyles("100000001100000", {
      color: colors.calendarDayForegroundPseudoSelected,
      ":before": {
        left: "0",
        width: "100%",
      },
      ":after": {
        content: null,
      },
    }),
    generateDayStyles("101111000000000", {
      color: colors.calendarDayForegroundSelectedHighlighted,
    }),
    generateDayStyles("101110100000000", {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ":before": { left: null, right: "50%" },
    }),
    generateDayStyles("101010010000000", {
      color: colors.calendarDayForegroundPseudoSelectedHighlighted,
      ":before": { left: "0", width: "100%" },
    }),
    generateDayStyles("100000000000001", outsideMonthDateStyle),
    generateDayStyles("100000001010001", outsideMonthDateStyle),
    generateDayStyles("100000001001001", outsideMonthDateStyle),
    generateDayStyles("100010000000001", outsideMonthDateStyle)
  );
  return dayStateStyle[code] || defaultDayStyle;
}
export const StyledDay = styled("div", (props) => {
  const {
    $disabled,
    $isFocusVisible,
    $isHighlighted,
    $peekNextMonth,
    $pseudoSelected,
    $range,
    $selected,
    $outsideMonth,
    $outsideMonthWithinRange,
    $hasDateLabel,
    $density,
    $hasLockedBehavior,
    $selectedInput,
    $value,
    $theme: { colors, typography, sizing },
  } = props;
  const code = getDayStateCode(props);
  let height;
  if ($hasDateLabel) {
    height = $density === DENSITY.high ? "60px" : "70px";
  } else {
    height = $density === DENSITY.high ? "40px" : "48px";
  }
  const [startDate, endDate] = Array.isArray($value) ? $value : [$value, null];
  const oppositeInputIsPopulated =
    $selectedInput === INPUT_ROLE.startDate
      ? endDate !== null && typeof endDate !== "undefined"
      : startDate !== null && typeof startDate !== "undefined";
  const shouldHighlightRange =
    $range && !($hasLockedBehavior && !oppositeInputIsPopulated);
  return {
    ...($density === DENSITY.high
      ? typography.ParagraphSmall
      : typography.ParagraphMedium),
    boxSizing: "border-box",
    position: "relative",
    cursor: $disabled || (!$peekNextMonth && $outsideMonth) ? "default" : "pointer",
    color: colors.calendarForeground,
    display: "inline-block",
    width: $density === DENSITY.high ? "42px" : "50px",
    height,
    lineHeight: $density === DENSITY.high ? sizing.scale700 : sizing.scale900,
    textAlign: "center",
    paddingTop: sizing.scale300,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale300,
    paddingRight: sizing.scale300,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    outline: "none",
    backgroundColor: "transparent",
    transform: "scale(1)",
    ...getDayStyles(code, props.$theme),
    ":after": {
      zIndex: -1,
      content: '""',
      boxSizing: "border-box",
      display: "inline-block",
      boxShadow:
        $isFocusVisible && (!$outsideMonth || $peekNextMonth)
          ? `0 0 0 3px ${colors.accent}`
          : "none",
      backgroundColor: $selected
        ? colors.calendarDayBackgroundSelectedHighlighted
        : $pseudoSelected && $isHighlighted
        ? colors.calendarDayBackgroundPseudoSelectedHighlighted
        : colors.calendarBackground,
      height: $hasDateLabel ? "100%" : $density === DENSITY.high ? "42px" : "50px",
      width: "100%",
      position: "absolute",
      top: $hasDateLabel ? 0 : "-1px",
      left: 0,
      paddingTop: sizing.scale200,
      paddingBottom: sizing.scale200,
      borderLeftWidth: "2px",
      borderRightWidth: "2px",
      borderTopWidth: "2px",
      borderBottomWidth: "2px",
      borderLeftStyle: "solid",
      borderRightStyle: "solid",
      borderTopStyle: "solid",
      borderBottomStyle: "solid",
      borderTopColor: colors.borderSelected,
      borderBottomColor: colors.borderSelected,
      borderRightColor: colors.borderSelected,
      borderLeftColor: colors.borderSelected,
      borderTopLeftRadius: $hasDateLabel ? sizing.scale800 : "100%",
      borderTopRightRadius: $hasDateLabel ? sizing.scale800 : "100%",
      borderBottomLeftRadius: $hasDateLabel ? sizing.scale800 : "100%",
      borderBottomRightRadius: $hasDateLabel ? sizing.scale800 : "100%",
      ...getDayStyles(code, props.$theme)[":after"],
      ...($outsideMonthWithinRange ? { content: null } : {}),
    },
    ...(shouldHighlightRange
      ? {
          ":before": {
            zIndex: -1,
            content: '""',
            boxSizing: "border-box",
            display: "inline-block",
            backgroundColor: colors.mono300,
            position: "absolute",
            height: "100%",
            width: "50%",
            top: 0,
            left: "50%",
            borderTopWidth: "2px",
            borderBottomWidth: "2px",
            borderLeftWidth: "0",
            borderRightWidth: "0",
            borderTopStyle: "solid",
            borderBottomStyle: "solid",
            borderLeftStyle: "solid",
            borderRightStyle: "solid",
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            ...getDayStyles(code, props.$theme)[":before"],
            ...($outsideMonthWithinRange
              ? {
                  backgroundColor: colors.mono300,
                  left: "0",
                  width: "100%",
                  content: '""',
                }
              : {}),
          },
        }
      : {}),
  };
});
export const StyledDayLabel = styled("div", (props) => {
  const {
    $theme: { typography, colors },
    $selected,
  } = props;
  return {
    ...typography.ParagraphXSmall,
    color: $selected ? colors.contentInverseTertiary : colors.contentTertiary,
  };
});
export const StyledWeekdayHeader = styled("div", (props) => {
  const {
    $theme: { typography, colors, sizing },
    $density,
  } = props;
  return {
    ...typography.LabelMedium,
    color: colors.contentTertiary,
    boxSizing: "border-box",
    position: "relative",
    cursor: "default",
    display: "inline-block",
    width: $density === DENSITY.high ? "42px" : "50px",
    height: $density === DENSITY.high ? "40px" : "48px",
    textAlign: "center",
    lineHeight: sizing.scale900,
    paddingTop: sizing.scale300,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale200,
    paddingRight: sizing.scale200,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "transparent",
  };
});
