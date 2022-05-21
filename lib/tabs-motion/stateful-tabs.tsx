import * as React from "react";
import { Tabs } from "./tabs";
import { STATE_CHANGE_TYPE } from "./constants";

import type {
  StatefulTabsPropsT,
  StatefulTabsStateT,
  StatefulTabsReducerT,
} from "./types";

const getInitialState = (children: React.Node, initialState?: StatefulTabsStateT) => {
  if (initialState && initialState.activeKey) {
    return initialState;
  } else {
    const firstKey = React.Children.map(children, (child, index) => {
      return child.key || String(index);
    })[0];
    return { activeKey: firstKey };
  }
};

const defaultStateReducer: StatefulTabsReducerT = (state, action) => {
  if (action.type === STATE_CHANGE_TYPE.change) {
    return { activeKey: action.payload };
  }
  return state;
};

export function StatefulTabs(props: StatefulTabsPropsT) {
  const {
    children,
    initialState,
    stateReducer = defaultStateReducer,
    onChange,
    ...restProps
  } = props;
  const [state, dispatch] = React.useReducer(
    stateReducer,
    getInitialState(children, initialState)
  );
  const handleChange = React.useCallback((params) => {
    const { activeKey } = params;
    dispatch({ type: STATE_CHANGE_TYPE.change, payload: activeKey });
    if (typeof onChange === "function") onChange(params);
  }, []);
  return (
    <Tabs {...restProps} activeKey={state.activeKey} onChange={handleChange}>
      {children}
    </Tabs>
  );
}
