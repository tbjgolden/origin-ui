import * as React from "react";
import StatefulListContainer from "./stateful-list-container";
import List from "./list";
import type { StatefulListPropsT, StateReducerT } from "./types";

const defaultStateReducer: StateReducerT = (type, nextState) => {
  return nextState;
};

function StatefulList(props: StatefulListPropsT) {
  return (
    <StatefulListContainer {...props}>
      {(componentProps) => {
        return <List {...componentProps} />;
      }}
    </StatefulListContainer>
  );
}

StatefulList.defaultProps = {
  initialState: { items: [] },
  stateReducer: defaultStateReducer,
};

export default StatefulList;
