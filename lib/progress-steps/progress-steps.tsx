


import * as React from "react";
import { getOverrides } from "../helpers/overrides";
import { StyledProgressSteps } from "./styled-components";
import type { ProgressStepsPropsT, StepPropsT } from "./types";

function ProgressSteps({ overrides = {}, current, children }: ProgressStepsPropsT) {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledProgressSteps);
  const numChildren = React.Children.count(children);
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) return;

    const childOverrides = child.props.overrides || {};

    const isActive =
      child.props.isActive !== undefined ? child.props.isActive : index === current;

    return React.cloneElement(
      child,
      ({
        isLast: index === numChildren - 1,
        isCompleted: index < current,
        isActive,
        step: index + 1,
        overrides: {
          ...overrides,
          Root: overrides.StepRoot,
          ...childOverrides,
        },
      }: StepPropsT)
    );
  });

  return (
    <Root data-baseweb="progress-steps" {...rootProps}>
      {modifiedChildren}
    </Root>
  );
}

ProgressSteps.defaultProps = {
  current: 0,
};

export default ProgressSteps;
