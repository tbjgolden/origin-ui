
import * as React from "react";
import StatefulListContainer from "./stateful-list-container.js";
import List from "./list.js";
import type { StatefulListPropsT, StateReducerT } from "./types.js";

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

function StatefulList(props: StatefulListPropsT) {
  return (
    <StatefulListContainer {...props}>
      {(componentProps) => <List {...componentProps} />}
    </StatefulListContainer>
  );
}

StatefulList.defaultProps = {
  initialState: { items: [] },
  stateReducer: defaultStateReducer,
};

export default StatefulList;
