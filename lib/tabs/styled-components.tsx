import { styled } from "../styles";
import { ORIENTATION } from "./constants";
export const Root = styled("div", (props) => {
  const { $orientation } = props;
  return {
    display: "flex",
    flexDirection: $orientation === ORIENTATION.vertical ? "row" : "column"
  };
});
export const Tab = styled("div", (props) => {
  const {
    $disabled,
    $active,
    $orientation,
    $isFocusVisible,
    $theme: { colors, sizing, typography }
  } = props;
  let style = {
    ...typography.font200,
    boxSizing: "border-box",
    color: $active ? colors.contentPrimary : colors.tabColor,
    cursor: $disabled ? "not-allowed" : "pointer",
    paddingTop: sizing.scale600,
    paddingBottom: sizing.scale600,
    paddingLeft: sizing.scale300,
    paddingRight: sizing.scale300,
    marginLeft: sizing.scale200,
    marginRight: sizing.scale200,
    outline: $isFocusVisible ? `3px solid ${colors.accent}` : "none",
    outlineOffset: "-3px",
    borderBottom: $orientation === ORIENTATION.horizontal && $active && !$isFocusVisible ? `2px solid ${colors.primary}` : "2px solid transparent",
    display: "inline-block"
  };
  if (!$disabled && !$active) {
    style = {
      ...style,
      ":focus": {
        color: colors.primary
      },
      ":hover": {
        color: colors.primary
      }
    };
  }
  return style;
});
export const TabBar = styled("div", (props) => {
  const {
    $orientation,
    $theme: { colors, sizing }
  } = props;
  return {
    display: "flex",
    flexDirection: $orientation === ORIENTATION.vertical ? "column" : "row",
    paddingLeft: sizing.scale400,
    paddingRight: sizing.scale400,
    backgroundColor: colors.tabBarFill
  };
});
export const TabContent = styled("div", (props) => {
  const {
    $active,
    $theme: { sizing, typography }
  } = props;
  return {
    ...typography.font300,
    display: $active ? "block" : "none",
    paddingLeft: sizing.scale800,
    paddingRight: sizing.scale800,
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500
  };
});
