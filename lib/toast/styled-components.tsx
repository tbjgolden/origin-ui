import { styled } from "../styles";
import { getSvgStyles } from "../icon/styled-components";
import { KIND, PLACEMENT, TYPE } from "./constants";
import {
  type SharedStylePropsArgT,
  type ToasterSharedStylePropsArgT,
  type KindTypeT,
  type NotificationTypeT,
  type PlacementTypeT,
} from "./types";
import type { ThemeT } from "../styles/types";
import type { StyleObject } from "styletron-standard";

function getBackgroundColor(kind: KindTypeT, type: NotificationTypeT, theme: ThemeT) {
  const isInline = type === TYPE.inline;
  return {
    [KIND.info]: isInline
      ? theme.colors.notificationInfoBackground
      : theme.colors.toastInfoBackground,
    [KIND.positive]: isInline
      ? theme.colors.notificationPositiveBackground
      : theme.colors.toastPositiveBackground,
    [KIND.warning]: isInline
      ? theme.colors.notificationWarningBackground
      : theme.colors.toastWarningBackground,
    [KIND.negative]: isInline
      ? theme.colors.notificationNegativeBackground
      : theme.colors.toastNegativeBackground,
  }[kind];
}

function getFontColor(kind: KindTypeT, type: NotificationTypeT, theme: ThemeT) {
  const isInline = type === TYPE.inline;
  if (isInline) {
    return {
      [KIND.info]: theme.colors.notificationInfoText,
      [KIND.positive]: theme.colors.notificationPositiveText,
      [KIND.warning]: theme.colors.notificationWarningText,
      [KIND.negative]: theme.colors.notificationNegativeText,
    }[kind];
  }

  return {
    [KIND.info]: theme.colors.toastInfoText,
    [KIND.positive]: theme.colors.toastPositiveText,
    [KIND.warning]: theme.colors.toastWarningText,
    [KIND.negative]: theme.colors.toastNegativeText,
  }[kind];
}

export function getPlacement(placement: PlacementTypeT) {
  return {
    [PLACEMENT.topLeft]: {
      top: 0,
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "column",
    },
    [PLACEMENT.top]: {
      top: 0,
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
    },
    [PLACEMENT.topRight]: {
      top: 0,
      alignItems: "flex-end",
      justifyContent: "flex-start",
      flexDirection: "column",
    },
    [PLACEMENT.bottomRight]: {
      bottom: 0,
      alignItems: "flex-end",
      justifyContent: "flex-end",
      flexDirection: "column-reverse",
    },
    [PLACEMENT.bottom]: {
      bottom: 0,
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "column-reverse",
    },
    [PLACEMENT.bottomLeft]: {
      bottom: 0,
      alignItems: "flex-start",
      justifyContent: "flex-end",
      flexDirection: "column-reverse",
    },
  }[placement];
}

export const Root = styled<ToasterSharedStylePropsArgT>(
  "div",
  ({ $placement, $theme }: ToasterSharedStylePropsArgT & { $theme: ThemeT }) => {
    return {
      pointerEvents: "none",
      position: "fixed",
      right: 0,
      left: 0,
      display: "flex",
      marginTop: $theme.sizing.scale300,
      marginBottom: $theme.sizing.scale300,
      marginLeft: $theme.sizing.scale600,
      marginRight: $theme.sizing.scale600,
      ...getPlacement($placement),
    };
  }
);

export const InnerContainer = styled<SharedStylePropsArgT>(
  "div",
  // eslint-disable-next-line no-empty-pattern
  ({}: SharedStylePropsArgT & { $theme: ThemeT }) => {
    return {};
  }
);

export const Body = styled<SharedStylePropsArgT>(
  "div",
  ({ $isVisible, $kind, $type, $theme }: SharedStylePropsArgT & { $theme: ThemeT }) => {
    const isInline = $type === TYPE.inline;
    return {
      ...$theme.typography.font300,
      pointerEvents: "auto",
      color: getFontColor($kind, $type, $theme),
      height: "auto",
      width: "288px",
      paddingTop: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale600,
      paddingLeft: $theme.sizing.scale600,
      marginTop: $theme.sizing.scale300,
      marginBottom: $theme.sizing.scale300,
      backgroundColor: getBackgroundColor($kind, $type, $theme) || $theme.colors.accent,
      borderTopLeftRadius: $theme.borders.radius400,
      borderTopRightRadius: $theme.borders.radius400,
      borderBottomRightRadius: $theme.borders.radius400,
      borderBottomLeftRadius: $theme.borders.radius400,
      boxShadow: isInline ? "none" : $theme.lighting.shadow600,
      opacity: $isVisible ? 1 : 0,
      transitionProperty: "all",
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: $theme.animation.easeInOutCurve,
      display: "flex",
      justifyContent: "space-between",
    };
  }
);

export const CloseIconSvg =
  styled <
  {
    ...SharedStylePropsArgT,
    $size: number | string,
    $color: string,
  } >
  ("svg",
  ({
    $theme,
    $size,
    $color,
    $isFocusVisible,
  }: SharedStylePropsArgT & {
    $size: any;
    $color: string;
    $theme: ThemeT;
  }): StyleObject => {
    return {
      ...getSvgStyles({ $theme, $size, $color }),
      cursor: "pointer",
      width: $size || "16px",
      flexShrink: 0,
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : "none",
    };
  });
