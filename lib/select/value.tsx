import { StyledSingleValue } from "./styled-components";
import { getOverrides } from "../helpers/overrides";
export default function Value(props) {
  const { overrides = {}, ...restProps } = props;
  const [SingleValue, singleValueProps] = getOverrides(
    overrides.SingleValue,
    StyledSingleValue
  );
  return (
    <SingleValue aria-selected="true" {...restProps} {...singleValueProps}>
      {props.children}
    </SingleValue>
  );
}
