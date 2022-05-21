import * as React from "react";
import { STATE_CHANGE_TYPE } from "./constants";
import type {
  CalendarPropsT,
  ContainerStateT,
  DatepickerPropsT,
  StatefulContainerPropsT,
  StateChangeTypeT,
  StateReducerT,
} from "./types";

type InputProps<T> = CalendarPropsT<T> | DatepickerPropsT<T>;

type PropsT<T> = StatefulContainerPropsT<InputProps<T>, T>;

class StatefulContainer<T = Date> extends React.Component<PropsT<T>, ContainerStateT<T>> {
  static defaultProps: { stateReducer: StateReducerT<T> } = {
    initialState: {},
    stateReducer: (type, nextState) => {
      return nextState;
    },
    onChange: () => {},
  };

  constructor(props: PropsT<T>) {
    super(props);
    const value = props.range ? [] : null;
    this.state = { value, ...props.initialState };
  }

  onChange = (data: { date: T | Array<T> }) => {
    const { date } = data;
    this.internalSetState(STATE_CHANGE_TYPE.change, { value: date });

    const onChange = this.props.onChange;
    if (onChange) {
      if (Array.isArray(date)) {
        if (date.every(Boolean)) {
          onChange({ date });
        }
      } else {
        onChange({ date });
      }
    }

    const onRangeChange = this.props.onRangeChange;
    if (onRangeChange) {
      onRangeChange({ date });
    }
  };

  internalSetState(type: StateChangeTypeT, changes: ContainerStateT<T>) {
    const { stateReducer } = this.props;
    this.setState((prevState) => {
      return stateReducer(type, changes, prevState);
    });
  }

  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    return this.props.children({
      ...restProps,
      value: this.state.value,
      onChange: this.onChange,
    });
  }
}

export default StatefulContainer;
