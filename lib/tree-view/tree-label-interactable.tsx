import { StyledLabelInteractable } from "./styled-components";
import { getOverride } from "../helpers/overrides";
const TreeLabelInteractable = ({ overrides = {}, ...props }) => {
  const LabelInteractable =
    getOverride(overrides.LabelInteractable) || StyledLabelInteractable;
  return (
    <LabelInteractable
      onClick={(e) => {
        return e.stopPropagation();
      }}
      onKeyDown={(e) => {
        return e.stopPropagation();
      }}
      {...props}
    />
  );
};
export default TreeLabelInteractable;
