import * as React from "react";

import Pagination from "./pagination";
import StatefulContainer from "./stateful-container";
import type { StatefulPaginationPropsT } from "./types";

export default function StatefulPagination({
  numPages,
  initialState,
  stateReducer,
  onPageChange,
  ...props
}: StatefulPaginationPropsT) {
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
  }, //flowlint-next-line unclear-type:off
  stateReducer: (changeType: any, changes: any) => {
    return changes;
  },
  overrides: {},
};
