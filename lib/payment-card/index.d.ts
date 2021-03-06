import React from "react";
import { StyletronComponent } from "styletron-react";

import { Override } from "../overrides";
import { InputProps, InputOverrides, StatefulContainerProps } from "../input";

export type PaymentCardOverrides = InputOverrides & {
  IconWrapper?: Override<any>;
};

export type PaymentCardProps = InputProps & { overrides?: PaymentCardOverrides };
export type StatefulPaymentCardProps = InputProps &
  StatefulContainerProps & { children?: never; overrides?: PaymentCardOverrides };

export const StatefulPaymentCard: React.FC<StatefulPaymentCardProps>;
export class PaymentCard extends React.Component<PaymentCardProps> {}

export const StyledIconWrapper: StyletronComponent<any>;

export * as valid from "card-validator";
export { SIZE, StatefulContainer } from "../input";
