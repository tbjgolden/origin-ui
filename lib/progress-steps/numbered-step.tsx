import { getOverrides } from "../helpers/overrides";
import {
  StyledNumberStep,
  StyledNumberIcon,
  StyledContent,
  StyledContentTitle,
  StyledNumberContentTail,
  StyledContentDescription,
} from "./styled-components";
import Check from "../icon/check";
function NumberedStep({
  overrides = {},
  isCompleted,
  isActive,
  isLast,
  title,
  step,
  children,
}) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledNumberStep);
  const [Icon, iconProps] = getOverrides(overrides.Icon, StyledNumberIcon);
  const [Tail, tailProps] = getOverrides(overrides.Tail, StyledNumberContentTail);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledContent);
  const [Title, titleProps] = getOverrides(overrides.Title, StyledContentTitle);
  const [Description, descriptionProps] = getOverrides(
    overrides.Description,
    StyledContentDescription
  );
  const [CheckIcon, checkIconProps] = getOverrides(overrides.Icon, Check);
  const sharedProps = {
    $isCompleted: isCompleted,
    $isActive: isActive,
  };
  return (
    <Root {...sharedProps} {...rootProps}>
      <Icon {...sharedProps} {...iconProps}>
        {!isCompleted && <span>{step}</span>}
        {isCompleted && <CheckIcon size={28} {...checkIconProps} />}
      </Icon>
      {!isLast && <Tail {...sharedProps} {...tailProps} />}
      <Content {...sharedProps} {...contentProps}>
        <Title {...sharedProps} {...titleProps}>
          {title}
        </Title>
        <Description {...descriptionProps}>{isActive && children}</Description>
      </Content>
    </Root>
  );
}
NumberedStep.defaultProps = {
  isCompleted: false,
  isLast: false,
};
export default NumberedStep;
