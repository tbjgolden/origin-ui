/* @flow */

import { styled, expandBorderStyles } from "../styles/index";

export const Action = styled<{}>("div", ({ $theme }) => {
  return {
    ...$theme.typography.LabelMedium,
  };
});

export const Body = styled<{}>("div", ({ $theme }) => {
  return {
    marginBottom: $theme.sizing.scale600,
    color: $theme.colors.contentPrimary,
    ...$theme.typography.ParagraphMedium,
  };
});

export const Contents = styled<{}>("div", ({ $theme }) => {
  return {
    marginLeft: $theme.sizing.scale600,
    marginTop: $theme.sizing.scale600,
    marginRight: $theme.sizing.scale600,
    marginBottom: $theme.sizing.scale600,
  };
});

export const HeaderImage = styled<{}>("img", ({ $theme }) => {
  return {
    borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
    borderTopRightRadius: $theme.borders.surfaceBorderRadius,
    objectFit: "contain",
    maxWidth: "100%",
  };
});

// by using the section tag, we can keep the h1 for the title
// https://html.spec.whatwg.org/multipage/sections.html#headings-and-sections
export const Root = styled<{}>("section", ({ $theme }) => {
  return {
    borderLeftWidth: "2px",
    borderTopWidth: "2px",
    borderRightWidth: "2px",
    borderBottomWidth: "2px",
    borderLeftStyle: "solid",
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftColor: $theme.colors.borderOpaque,
    borderRightColor: $theme.colors.borderOpaque,
    borderTopColor: $theme.colors.borderOpaque,
    borderBottomColor: $theme.colors.borderOpaque,
    borderTopLeftRadius: $theme.borders.radius400,
    borderTopRightRadius: $theme.borders.radius400,
    borderBottomLeftRadius: $theme.borders.radius400,
    borderBottomRightRadius: $theme.borders.radius400,
    backgroundColor: $theme.colors.backgroundPrimary,
    overflow: "hidden",
  };
});

export const Thumbnail = styled<{}>("img", ({ $theme }) => {
  return {
    float: "right",
    height: $theme.sizing.scale2400,
    width: $theme.sizing.scale2400,
    objectFit: "cover",
    borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
    borderTopRightRadius: $theme.borders.surfaceBorderRadius,
    borderBottomLeftRadius: $theme.borders.surfaceBorderRadius,
    borderBottomRightRadius: $theme.borders.surfaceBorderRadius,
    ...expandBorderStyles($theme.borders.border200),
    margin: `0 0 ${$theme.sizing.scale500} ${$theme.sizing.scale500}`,
  };
});

export const Title = styled<{}>("h1", ({ $theme }) => {
  return {
    ...$theme.typography.HeadingSmall,
    color: $theme.colors.contentPrimary,
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: $theme.sizing.scale500,
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
  };
});
