import * as React from "react";

import { Popover, PLACEMENT } from "../popover/index";
import { mergeOverrides } from "../helpers/overrides";

import { StyledArrow, StyledBody } from "./styled-components";
import type { PropsT } from "./types";

export function Helper(props: PropsT) {
  const { overrides = {}, placement, ...restProps } = props;

  const mergedOverrides = mergeOverrides(
    {
      Arrow: placement !== PLACEMENT.auto ? StyledArrow : {},
      Body: placement !== PLACEMENT.auto ? StyledBody : {},
      Inner: {
        style: ({ $theme }) => {
          return { backgroundColor: $theme.colors.backgroundPrimary };
        },
      },
    },
    overrides
  );

  return (
    //$FlowFixMe
    <Popover
      data-baseweb="helper"
      {...restProps}
      autoFocus={false}
      placement={placement}
      overrides={mergedOverrides}
    />
  );
}

Helper.defaultProps = {
  ...Popover.defaultProps,
  placement: PLACEMENT.bottom,
  showArrow: true,
};
