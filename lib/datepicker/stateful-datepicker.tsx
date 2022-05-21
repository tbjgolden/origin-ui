import * as React from "react";
import StatefulContainer from "./stateful-container";
import Datepicker from "./datepicker";
import type { StatefulDatepickerPropsT, DatepickerPropsT } from "./types";

type PropsT<T> = StatefulDatepickerPropsT<DatepickerPropsT<T>, T>;

class StatefulComponent<T = Date> extends React.Component<PropsT<T>> {
  static defaultProps: PropsT<T> = {
    initialState: {},
    stateReducer: (type, nextState) => {
      return nextState;
    },
    onChange: () => {},
  };
  render() {
    return (
      <StatefulContainer {...this.props}>
        {(extendedProps) => {
          return <Datepicker {...extendedProps} onChange={extendedProps.onChange} />;
        }}
      </StatefulContainer>
    );
  }
}

export default StatefulComponent;
