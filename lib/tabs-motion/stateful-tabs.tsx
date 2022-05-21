import * as React from "react";
import { Tabs } from "./tabs";
import { STATE_CHANGE_TYPE } from "./constants";
const getInitialState = (children, initialState) => {
  if (initialState && initialState.activeKey) {
    return initialState;
  } else {
    const firstKey = React.Children.map(children, (child, index) => {
      return child.key || String(index);
    })[0];
    return { activeKey: firstKey };
  }
};
const defaultStateReducer = (state, action) => {
  if (action.type === STATE_CHANGE_TYPE.change) {
    return { activeKey: action.payload };
  }
  return state;
};
export function StatefulTabs(props) {
  const {
    children,
    initialState,
    stateReducer = defaultStateReducer,
    onChange,
    ...restProps
  } = props;
  const [state, dispatch] = React.useReducer(stateReducer, getInitialState(children, initialState));
  const handleChange = React.useCallback((params) => {
    const { activeKey } = params;
    dispatch({ type: STATE_CHANGE_TYPE.change, payload: activeKey });
    if (typeof onChange === "function")
      onChange(params);
  }, []);
  return <Tabs {...restProps} activeKey={state.activeKey} onChange={handleChange}>{children}</Tabs>;
}
