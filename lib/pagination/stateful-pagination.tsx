import Pagination from "./pagination";
import StatefulContainer from "./stateful-container";
export default function StatefulPagination({
  numPages,
  initialState,
  stateReducer,
  onPageChange,
  ...props
}) {
  return (
    <StatefulContainer
      numPages={numPages}
      initialState={initialState}
      stateReducer={stateReducer}
      onPageChange={onPageChange}
    >
      {(renderProps) => {
        return <Pagination numPages={numPages} {...renderProps} {...props} />;
      }}
    </StatefulContainer>
  );
}
StatefulPagination.defaultProps = {
  initialState: {
    currentPage: 1,
  },
  stateReducer: (changeType, changes) => {
    return changes;
  },
  overrides: {},
};
