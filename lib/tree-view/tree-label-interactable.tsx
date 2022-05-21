
import React from "react";
import { StyledLabelInteractable } from "./styled-components.js";
import { getOverride } from "../helpers/overrides.js";
import type { OverrideT } from "../helpers/overrides.js";

const TreeLabelInteractable: React$ComponentType<{
  overrides?: { LabelInteractable: OverrideT },
}> = ({ overrides = {}, ...props }) => {
  const LabelInteractable =
    getOverride(overrides.LabelInteractable) || StyledLabelInteractable;
  return (
    // $FlowExpectedError[cannot-spread-inexact]
    <LabelInteractable
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      {...props}
    />
  );
};

export default TreeLabelInteractable;
