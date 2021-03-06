import { styled, expandBorderStyles } from "../styles";
import { artworkSizeToValue } from "./utils";
import { SHAPE } from "./constants";
export const StyledRoot = styled("li", ({ $theme, $shape }) => {
  return {
    alignItems: "center",
    backgroundColor: $theme.colors.backgroundPrimary,
    display: "flex",
    listStyleType: "none",
    width: "100%",
    borderTopLeftRadius: $shape === SHAPE.ROUND ? $theme.borders.radius400 : 0,
    borderTopRightRadius: $shape === SHAPE.ROUND ? $theme.borders.radius400 : 0,
    borderBottomLeftRadius: $shape === SHAPE.ROUND ? $theme.borders.radius400 : 0,
    borderBottomRightRadius: $shape === SHAPE.ROUND ? $theme.borders.radius400 : 0,
    overflow: "hidden",
  };
});
export const StyledContent = styled("div", ({ $mLeft, $sublist, $theme }) => {
  return {
    ...expandBorderStyles($theme.borders.border100),
    alignItems: "center",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderLeftStyle: "none",
    display: "flex",
    flexGrow: 1,
    minHeight: $sublist ? "initial" : $theme.sizing.scale1600,
    justifyContent: "space-between",
    paddingRight: $theme.sizing.scale600,
    marginLeft: $mLeft ? $theme.sizing.scale600 : null,
  };
});
export const StyledEndEnhancerContainer = styled("div", {
  alignItems: "center",
  display: "flex",
});
export const StyledArtworkContainer = styled(
  "div",
  ({ $artworkSize, $sublist, $theme }) => {
    const sizeValue =
      typeof $artworkSize === "number"
        ? $artworkSize
        : artworkSizeToValue($artworkSize, Boolean($sublist));
    if (sizeValue > 36) {
      return {
        alignItems: "center",
        display: "flex",
        paddingLeft: $theme.sizing.scale600,
        paddingRight: $theme.sizing.scale600,
      };
    }
    return {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: $theme.sizing.scale1600,
    };
  }
);
export const StyledLabelContent = styled("p", ({ $theme }) => {
  return {
    ...$theme.typography.LabelMedium,
    color: $theme.colors.contentPrimary,
    marginTop: 0,
    marginBottom: 0,
  };
});
export const StyledLabelDescription = styled("p", ({ $theme }) => {
  return {
    ...$theme.typography.ParagraphSmall,
    color: $theme.colors.contentPrimary,
    marginTop: 0,
    marginBottom: 0,
  };
});
export const StyledLabelSublistContent = styled("p", ({ $theme }) => {
  return {
    ...$theme.typography.LabelMedium,
    color: $theme.colors.contentPrimary,
    marginTop: $theme.sizing.scale500,
    marginBottom: $theme.sizing.scale500,
  };
});
export const StyledHeadingRoot = styled("div", ({ $theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: $theme.colors.backgroundPrimary,
    overflow: "hidden",
    minHeight: $theme.sizing.scale1600,
  };
});
export const StyledHeadingContent = styled("div", ({ $theme }) => {
  return {
    flexGrow: 1,
    width: "100%",
    minWidth: 0,
    paddingTop: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    marginLeft: $theme.sizing.scale600,
  };
});
export const StyledHeadingContentRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});
export const StyledHeadingMainHeading = styled("p", ({ $maxLines = 1, $theme }) => {
  return {
    ...$theme.typography.HeadingSmall,
    color: $theme.colors.contentPrimary,
    marginTop: 0,
    marginBottom: 0,
    marginRight: $theme.sizing.scale600,
    display: "-webkit-box",
    "-webkit-line-clamp": $maxLines,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  };
});
export const StyledHeadingSubHeading = styled("p", ({ $maxLines = 1, $theme }) => {
  return {
    ...$theme.typography.ParagraphLarge,
    color: $theme.colors.contentPrimary,
    marginTop: 0,
    marginBottom: 0,
    marginRight: $theme.sizing.scale600,
    display: "-webkit-box",
    "-webkit-line-clamp": $maxLines,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  };
});
export const StyledHeadingEndEnhancerContainer = styled("div", ({ $isText, $theme }) => {
  return {
    ...$theme.typography.LabelMedium,
    display: "flex",
    alignItems: $isText ? "flex-end" : "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
});
export const StyledHeadingEndEnhancerDescriptionContainer = styled("p", ({ $theme }) => {
  return {
    ...$theme.typography.ParagraphMedium,
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    alignItems: "flex-start",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
});
