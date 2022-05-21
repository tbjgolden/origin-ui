import * as React from "react";
import StatefulContainer from "./stateful-container";
import Calendar from "./calendar";
import type { CalendarPropsT, StatefulDatepickerPropsT } from "./types";

type PropsT<T> = StatefulDatepickerPropsT<CalendarPropsT<T>>;

class StatefulComponent<T = Date> extends React.Component<PropsT<T>> {
  static defaultProps: PropsT<T> = {
    initialState: {},
    stateReducer: (type, nextState) => {
      return nextState;
    },
    onSelect: () => {},
  };

  render() {
    return (
      <StatefulContainer {...this.props}>
        {(extendedProps) => {
          return <Calendar {...extendedProps} onChange={extendedProps.onChange} />;
        }}
      </StatefulContainer>
    );
  }
}

export default StatefulComponent;
