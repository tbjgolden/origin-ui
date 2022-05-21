

import * as React from "react";

import StatefulContainer from "./stateful-container.js";
import TreeView from "./tree-view.js";
import type { TreeViewPropsT } from "./types.js";

export default function StatefulTreeView(props: TreeViewPropsT) {
  return (
    <StatefulContainer {...props}>
      {(treeViewProps) => <TreeView {...treeViewProps} />}
    </StatefulContainer>
  );
}
