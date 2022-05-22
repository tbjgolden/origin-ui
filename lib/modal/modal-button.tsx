import React from "react";
import { Button } from "../button";
import { mergeOverrides } from "../helpers/overrides";
const overrides = {
  BaseButton: {
    style: ({ $theme }) => {
      return {
        ":not(:last-child)": {
          marginRight: $theme.sizing.scale500,
        },
      };
    },
  },
};
const ModalButton = React.forwardRef((props, ref) => {
  return (
    <Button ref={ref} {...props} overrides={mergeOverrides(overrides, props.overrides)} />
  );
});
ModalButton.displayName = "ModalButton";
export default ModalButton;
