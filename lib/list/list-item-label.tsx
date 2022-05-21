import { getOverrides } from "../helpers/overrides";
import {
  StyledLabelContent,
  StyledLabelDescription,
  StyledLabelSublistContent
} from "./styled-components";
function ListItemLabel(props) {
  const { overrides = {} } = props;
  const [LabelSublistContent, labelSublistContentProps] = getOverrides(overrides.LabelSublistContent, StyledLabelSublistContent);
  const [LabelContent, labelContentProps] = getOverrides(overrides.LabelContent, StyledLabelContent);
  const [LabelDescription, labelDescriptionProps] = getOverrides(overrides.LabelDescription, StyledLabelDescription);
  if (props.sublist) {
    return <LabelSublistContent {...labelSublistContentProps}>{props.children}</LabelSublistContent>;
  }
  return <div>
    <LabelContent {...labelContentProps}>{props.children}</LabelContent>
    {props.description && <LabelDescription {...labelDescriptionProps}>{props.description}</LabelDescription>}
  </div>;
}
export default ListItemLabel;
