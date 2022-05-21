import * as React from "react";
import { StyledSingleValue } from "./styled-components";
import { getOverrides } from "../helpers/overrides";

// flowlint-next-line unclear-type:off
export default function Value(props: any) {
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
