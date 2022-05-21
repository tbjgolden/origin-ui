import React from "react";
import * as ReactIs from "react-is";
import { getOverrides } from "../helpers/overrides";
import {
  StyledHeadingRoot,
  StyledHeadingContent,
  StyledHeadingContentRow,
  StyledHeadingEndEnhancerContainer,
  StyledHeadingEndEnhancerDescriptionContainer,
  StyledHeadingMainHeading,
  StyledHeadingSubHeading
} from "./styled-components";
function RenderNode(props) {
  const { component, ...restProps } = props;
  const Component = component;
  if (!Component) {
    return null;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (ReactIs.isValidElementType(Component)) {
    return <Component {...restProps} />;
  }
  return Component;
}
function isMaxLinesValid(maxLines) {
  return maxLines === 1 || maxLines === 2;
}
const ListHeading = React.forwardRef((props, ref) => {
  const { overrides = {}, maxLines } = props;
  const EndEnhancer = props.endEnhancer;
  const EndEnhancerDescription = props.endEnhancerDescription;
  const SubHeading = props.subHeading;
  const [Root, rootProps] = getOverrides(overrides.Root, StyledHeadingRoot);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledHeadingContent);
  const [HeadingContainer, headingContainerProps] = getOverrides(overrides.HeadingContainer, StyledHeadingMainHeading);
  const [SubHeadingContainer, subHeadingContainerProps] = getOverrides(overrides.SubHeadingContainer, StyledHeadingSubHeading);
  const [EndEnhancerContainer, endEnhancerContainerProps] = getOverrides(overrides.EndEnhancerContainer, StyledHeadingEndEnhancerContainer);
  const [EndEnhancerDescriptionContainer, endEnhancerDescriptionContainerProps] = getOverrides(overrides.EndEnhancerDescriptionContainer, StyledHeadingEndEnhancerDescriptionContainer);
  const isEndEnhancerString = typeof EndEnhancer === "string";
  if (__DEV__) {
    if (isEndEnhancerString && EndEnhancerDescription) {
      console.warn("endEnhancerDescription will not be rendered if endEnhancer is not a string");
    }
    if (maxLines && !isMaxLinesValid(maxLines)) {
      console.warn("maxLines must be 1 or 2.");
    }
  }
  return <Root ref={ref} {...rootProps}><Content {...contentProps}>
    <StyledHeadingContentRow>
      <HeadingContainer $maxLines={isMaxLinesValid(maxLines) ? maxLines : 1} {...headingContainerProps}><RenderNode component={props.heading} /></HeadingContainer>
      {EndEnhancer && <EndEnhancerContainer $isText={isEndEnhancerString} {...endEnhancerContainerProps}><RenderNode component={EndEnhancer} /></EndEnhancerContainer>}
    </StyledHeadingContentRow>
    {(Boolean(SubHeading) || EndEnhancerDescription) && <StyledHeadingContentRow>
      <SubHeadingContainer $maxLines={isMaxLinesValid(maxLines) ? maxLines : 1} {...subHeadingContainerProps}><RenderNode component={SubHeading} /></SubHeadingContainer>
      {Boolean(EndEnhancerDescription) && isEndEnhancerString && <EndEnhancerDescriptionContainer {...endEnhancerDescriptionContainerProps}><RenderNode component={EndEnhancerDescription} /></EndEnhancerDescriptionContainer>}
    </StyledHeadingContentRow>}
  </Content></Root>;
});
ListHeading.displayName = "ListHeading";
export default ListHeading;
