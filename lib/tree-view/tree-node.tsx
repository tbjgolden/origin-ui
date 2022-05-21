import React from "react";
import { StyledTreeItemList, StyledTreeItem } from "./styled-components";
import StyledTreeLabel from "./tree-label";
import { getOverride, getOverrideProps } from "../helpers/overrides";
export default class TreeNode extends React.Component {
  constructor() {
    super(...arguments);
    this.treeItemRef = React.createRef();
    this.onToggle = () => {
      const { onToggle, node } = this.props;
      if (onToggle) {
        onToggle(node);
      }
    };
    this.onFocus = (e) => {
      if (e && e.target !== this.treeItemRef.current) return;
      const { onFocus } = this.props;
      if (onFocus) {
        onFocus(e);
      }
    };
  }
  componentDidMount() {
    this.props.addRef(this.props.getId(this.props.node), this.treeItemRef);
  }
  componentWillUnmount() {
    this.props.removeRef(this.props.getId(this.props.node));
  }
  render() {
    const {
      indentGuides,
      node,
      getId,
      onToggle,
      overrides = {},
      renderAll,
      selectedNodeId,
      onKeyDown,
      onFocus,
      onBlur,
      addRef,
      removeRef,
      isFocusVisible,
    } = this.props;
    const { children, isExpanded, label } = node;
    const hasChildren = children && children.length > 0;
    const {
      TreeItemList: TreeItemListOverride,
      TreeItem: TreeItemOverride,
      TreeLabel: TreeLabelOverride,
    } = overrides;
    const TreeItemList = getOverride(TreeItemListOverride) || StyledTreeItemList;
    const TreeItem = getOverride(TreeItemOverride) || StyledTreeItem;
    const TreeLabel = getOverride(TreeLabelOverride) || StyledTreeLabel;
    return (
      <TreeItem
        role="treeitem"
        ref={this.treeItemRef}
        data-nodeid={getId(node)}
        tabIndex={selectedNodeId === getId(node) ? 0 : -1}
        onKeyDown={(e) => {
          return onKeyDown && onKeyDown(e, node);
        }}
        onBlur={onBlur}
        onFocus={this.onFocus}
        aria-expanded={isExpanded}
        $isLeafNode={!hasChildren}
        {...getOverrideProps(TreeItemOverride)}
      >
        <TreeLabel
          onClick={this.onToggle}
          node={node}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          isSelected={selectedNodeId === getId(node)}
          isFocusVisible={isFocusVisible}
          label={label}
          overrides={overrides}
          {...getOverrideProps(TreeLabelOverride)}
        />
        {children && (isExpanded || renderAll) && (
          <TreeItemList
            role="group"
            $indentGuides={!!indentGuides}
            $isChildNode={true}
            $expanded={!!isExpanded}
            {...getOverrideProps(TreeItemListOverride)}
          >
            {children.map((node2, index) => {
              return (
                <TreeNode
                  indentGuides={!!indentGuides}
                  renderAll={renderAll}
                  key={index}
                  node={node2}
                  getId={getId}
                  onToggle={onToggle}
                  overrides={overrides}
                  selectedNodeId={selectedNodeId}
                  onKeyDown={onKeyDown}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  addRef={addRef}
                  removeRef={removeRef}
                  isFocusVisible={isFocusVisible}
                />
              );
            })}
          </TreeItemList>
        )}
      </TreeItem>
    );
  }
}
