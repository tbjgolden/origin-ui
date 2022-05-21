import StatefulListContainer from "./stateful-list-container";
import List from "./list";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
function StatefulList(props) {
  return <StatefulListContainer {...props}>{(componentProps) => {
    return <List {...componentProps} />;
  }}</StatefulListContainer>;
}
StatefulList.defaultProps = {
  initialState: { items: [] },
  stateReducer: defaultStateReducer
};
export default StatefulList;
