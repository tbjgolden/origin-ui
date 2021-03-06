import { styled } from "../styles";
import { ORIENTATION, FILL } from "./constants";
import { isHorizontal, isVertical, isRTL, isIntrinsic, isFixed } from "./utils";
export const StyledRoot = styled(
  "div",
  ({ $theme, $orientation = ORIENTATION.horizontal }) => {
    const style = {
      transform: "scale(1)",
    };
    if (isVertical($orientation)) {
      style.display = "flex";
    }
    return style;
  }
);
export const StyledTabList = styled(
  "div",
  ({ $theme, $fill = FILL.intrinsic, $orientation = ORIENTATION.horizontal }) => {
    const style = {
      position: "relative",
      display: "flex",
      flexWrap: "nowrap",
    };
    if (isHorizontal($orientation)) {
      style.flexDirection = "row";
      style.paddingBottom = "5px";
      style.marginBottom = "-5px";
    } else {
      style.flexDirection = "column";
      style.paddingRight = "5px";
      style.marginRight = "-5px";
    }
    if (isIntrinsic($fill)) {
      style["::-webkit-scrollbar"] = { display: "none" };
      style["-ms-overflow-style"] = "none";
      style.scrollbarWidth = "none";
      if (isHorizontal($orientation)) {
        style.overflowX = "scroll";
      } else {
        style.overflowY = "scroll";
      }
    }
    return style;
  }
);
export const StyledTab = styled(
  "button",
  ({
    $theme,
    $orientation = ORIENTATION.horizontal,
    $fill = FILL.intrinsic,
    $focusVisible = false,
    $isActive = false,
  }) => {
    const style = {
      cursor: "pointer",
      WebkitAppearance: "none",
      marginLeft: "0",
      marginRight: "0",
      marginTop: "0",
      marginBottom: "0",
      boxSizing: "border-box",
      display: "inline-flex",
      alignItems: "center",
      paddingLeft: $theme.sizing.scale600,
      paddingTop: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale600,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftStyle: "none",
      borderTopStyle: "none",
      borderRightStyle: "none",
      borderBottomStyle: "none",
      color: $theme.colors.contentPrimary,
      background: $theme.colors.backgroundPrimary,
      transitionProperty: "background",
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: $theme.animation.linearCurve,
      outline: "none",
      outlineOffset: "-3px",
      ":disabled": {
        cursor: "not-allowed",
        color: $theme.colors.contentStateDisabled,
      },
      ":hover": {
        background: $theme.colors.backgroundSecondary,
      },
      ":disabled:hover": {
        background: "none",
      },
      ...$theme.typography.LabelSmall,
    };
    if ($focusVisible) {
      style.outline = `3px solid ${$theme.colors.accent}`;
    }
    if (isFixed($fill)) {
      style.flexGrow = 1;
      style.flexBasis = 0;
    }
    style.justifyContent = isHorizontal($orientation) ? "center" : "flex-end";
    return style;
  }
);
export const StyledArtworkContainer = styled(
  "div",
  ({ $theme, $orientation = ORIENTATION.horizontal }) => {
    const style = {
      display: "flex",
    };
    style.marginRight = $theme.sizing.scale300;
    return style;
  }
);
export const StyledTabBorder = styled(
  "div",
  ({ $theme, $orientation = ORIENTATION.horizontal }) => {
    const style = {
      backgroundColor: $theme.colors.borderOpaque,
      position: "relative",
    };
    if (isHorizontal($orientation)) {
      style.height = "5px";
    } else {
      style.width = "5px";
    }
    return style;
  }
);
export const StyledTabHighlight = styled(
  "div",
  ({
    $theme,
    $orientation = ORIENTATION.horizontal,
    $length = 0,
    $distance = 0,
    $animate = false,
  }) => {
    const style = {
      backgroundColor: $theme.colors.borderSelected,
      position: "absolute",
      zIndex: 1,
    };
    if (isHorizontal($orientation)) {
      style.bottom = "0px";
      style.left = "0px";
      style.height = "5px";
      style.width = `${$length}px`;
      style.transform = `translateX(${$distance}px)`;
    } else {
      style.transform = `translateY(${$distance}px)`;
      style.width = "5px";
      style.height = `${$length}px`;
      style.right = "0px";
    }
    if ($animate) {
      style.transitionProperty = "all";
      style.transitionDuration = $theme.animation.timing400;
      style.transitionTimingFunction = $theme.animation.easeInOutQuinticCurve;
    }
    return style;
  }
);
export const StyledTabPanel = styled("div", ({ $theme, $pad = true }) => {
  const style = {
    flexGrow: 1,
    outline: "none",
  };
  if ($pad) {
    style.paddingTop = $theme.sizing.scale600;
    style.paddingRight = $theme.sizing.scale600;
    style.paddingBottom = $theme.sizing.scale600;
    style.paddingLeft = $theme.sizing.scale600;
  }
  return style;
});
