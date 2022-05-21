import * as React from "react";
import StatefulContainer from "./stateful-container";
import Datepicker from "./datepicker";
class StatefulComponent extends React.Component {
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
StatefulComponent.defaultProps = {
  initialState: {},
  stateReducer: (type, nextState) => {
    return nextState;
  },
  onChange: () => {},
};
export default StatefulComponent;
