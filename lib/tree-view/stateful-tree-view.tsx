import * as React from "react";

import StatefulContainer from "./stateful-container";
import TreeView from "./tree-view";
import type { TreeViewPropsT } from "./types";

export default function StatefulTreeView(props: TreeViewPropsT) {
  return (
    <StatefulContainer {...props}>
      {(treeViewProps) => {
        return <TreeView {...treeViewProps} />;
      }}
    </StatefulContainer>
  );
}
