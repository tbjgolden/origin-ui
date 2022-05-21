

import type { InputComponentsT, InputPropsT, StInputPropsDiffT } from "../input/types.js";
import type { OverrideT } from "../helpers/overrides.js";

export type PaymentCardComponentsT = {
  ...InputComponentsT,
  IconWrapper?: OverrideT,
};

export type PaymentCardPropsT = {
  ...InputPropsT,
  overrides: PaymentCardComponentsT,
};

export type StatefulPaymentCardPropsT = {
  ...StInputPropsDiffT,
  overrides?: PaymentCardComponentsT,
};
