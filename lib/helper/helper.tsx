import { Popover, PLACEMENT } from "../popover";
import { mergeOverrides } from "../helpers/overrides";
import { StyledArrow, StyledBody } from "./styled-components";
export function Helper(props) {
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
