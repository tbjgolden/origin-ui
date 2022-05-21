import * as React from "react";
import StatefulContainer from "./stateful-container";
import Calendar from "./calendar";
class StatefulComponent extends React.Component {
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
StatefulComponent.defaultProps = {
  initialState: {},
  stateReducer: (type, nextState) => {
    return nextState;
  },
  onSelect: () => {},
};
export default StatefulComponent;
