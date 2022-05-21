import * as React from "react";

import Pagination from "./pagination.js";
import StatefulContainer from "./stateful-container.js";
import type { StatefulPaginationPropsT } from "./types.js";

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
      {(renderProps) => <Pagination numPages={numPages} {...renderProps} {...props} />}
    </StatefulContainer>
  );
}

StatefulPagination.defaultProps = {
  initialState: {
    currentPage: 1,
  }, //flowlint-next-line unclear-type:off
  stateReducer: (changeType: any, changes: any) => changes,
  overrides: {},
};
