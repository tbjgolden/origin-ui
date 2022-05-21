import React from "react";
import { StyletronComponent } from "styletron-react";
import {
  STATE_CHANGE_TYPE,
  PopoverProps,
  StatefulPopoverContainerProps,
  StatefulPopoverProps,
} from "../popover";

export type StatefulTooltipProps = StatefulPopoverProps;
export const StatefulTooltip: React.FC<StatefulTooltipProps>;

export type StatefulTooltipContainerProps = StatefulPopoverContainerProps;
export class StatefulContainer extends React.Component<StatefulTooltipContainerProps> {}

export type TooltipProps = PopoverProps;
export class Tooltip extends React.Component<TooltipProps> {}

export const StyledArrow: StyletronComponent<any>;
export const StyledBody: StyletronComponent<any>;
export const StyledInner: StyletronComponent<any>;

export { ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE } from "../popover";
