


export type {
  PopoverPropsT as PropsT,
  StatefulPopoverPropsT as StatefulPropsT,
} from "../popover/index.js";

export type HelperStepsPropsT = {|
  index: number,
  length: number,
  onFinish: () => mixed,
  onPrev: () => mixed,
  onNext: () => mixed,
|};
