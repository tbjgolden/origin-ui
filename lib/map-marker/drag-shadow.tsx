import { getOverrides } from "../helpers/overrides";
import { dragShadowWidth } from "./constants";
import { StyledDragShadow, StyledDragShadowContainer } from "./styled-components";
const DragShadow = ({
  background,
  dragging,
  height,
  overrides = {}
}) => {
  const [DragShadowContainer, dragShadowContainerProps] = getOverrides(overrides.DragShadowContainer, StyledDragShadowContainer);
  const [DragShadow2, dragShadowProps] = getOverrides(overrides.DragShadow, StyledDragShadow);
  return <DragShadowContainer $width={dragShadowWidth} $height={height} $dragging={dragging} {...dragShadowContainerProps}><DragShadow2 $width={dragShadowWidth} $background={background} {...dragShadowProps} /></DragShadowContainer>;
};
export default DragShadow;
