import React from "react";
import { StyledLabelInteractable } from "./styled-components";
import { getOverride } from "../helpers/overrides";
import type { OverrideT } from "../helpers/overrides";

const TreeLabelInteractable: React$ComponentType<{
  overrides?: { LabelInteractable: OverrideT };
}> = ({ overrides = {}, ...props }) => {
  const LabelInteractable =
    getOverride(overrides.LabelInteractable) || StyledLabelInteractable;
  return (
    // $FlowExpectedError[cannot-spread-inexact]
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
