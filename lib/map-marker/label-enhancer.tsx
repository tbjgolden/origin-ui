import { getOverrides } from "../helpers/overrides";
import {
  RelativeContainer,
  StyledStrokedLabel,
  StyledStrokedLabelContainer
} from "./styled-components";
import { LABEL_ENHANCER_POSITIONS } from "./constants";
const LabelEnhancer = ({
  labelEnhancerContent,
  labelEnhancerPosition,
  needleHeight,
  size,
  overrides = {}
}) => {
  if (!labelEnhancerPosition || labelEnhancerPosition === LABEL_ENHANCER_POSITIONS.none) {
    return null;
  }
  if (!labelEnhancerContent) {
    return null;
  }
  const [StrokedLabelContainer, strokedLabelContainerProps] = getOverrides(overrides.LabelEnhancerContainer, StyledStrokedLabelContainer);
  const [StrokedLabel, strokedLabelProps] = getOverrides(overrides.LabelEnhancer, StyledStrokedLabel);
  return <StrokedLabelContainer $position={labelEnhancerPosition} $labelOffset={needleHeight} {...strokedLabelContainerProps}><RelativeContainer><StrokedLabel $size={size} {...strokedLabelProps}>{labelEnhancerContent}</StrokedLabel></RelativeContainer></StrokedLabelContainer>;
};
export default LabelEnhancer;
