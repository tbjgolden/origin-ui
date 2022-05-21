import * as React from "react";
import { Button } from "../button/index";
import type { ButtonPropsT } from "../button/types";
import { mergeOverrides } from "../helpers/overrides";

// ModalButtons should have some margin pre-applied
const overrides = {
  BaseButton: {
    style: ({ $theme }) => {
      const marginInlineEnd: string =
        $theme.direction !== "rtl" ? "marginRight" : "marginLeft";
      return {
        ":not(:last-child)": {
          [marginInlineEnd]: $theme.sizing.scale500,
        },
      };
    },
  },
};

const ModalButton = React.forwardRef<ButtonPropsT, HTMLElement>((props, ref) => {
  return (
    //$FlowExpectedError[cannot-spread-inexact]
    <Button ref={ref} {...props} overrides={mergeOverrides(overrides, props.overrides)} />
  );
});
ModalButton.displayName = "ModalButton";

export default ModalButton;
