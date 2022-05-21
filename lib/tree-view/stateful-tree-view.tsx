import StatefulContainer from "./stateful-container";
import TreeView from "./tree-view";
export default function StatefulTreeView(props) {
  return (
    <StatefulContainer {...props}>
      {(treeViewProps) => {
        return <TreeView {...treeViewProps} />;
      }}
    </StatefulContainer>
  );
}
