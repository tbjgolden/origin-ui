import * as React from "react";

import TreeNode from "./tree-node";
import { StyledTreeItemList } from "./styled-components";
import {
  getPrevId,
  getNextId,
  getParentId,
  getFirstChildId,
  getEndId,
  getExpandableSiblings,
  defaultGetId,
  getCharMatchId,
} from "./utils";
import type { TreeViewPropsT, TreeNodeT, TreeNodeIdT, ReactRefT } from "./types";
import { isFocusVisible } from "../utils/focusVisible";

import { getOverride, getOverrideProps } from "../helpers/overrides";

export default function TreeView(props: TreeViewPropsT) {
  const {
    data,
    indentGuides = false,
    onToggle,
    overrides = {},
    renderAll,
    getId = defaultGetId,
  } = props;
  const { Root: RootOverride } = overrides;

  const Root = getOverride(RootOverride) || StyledTreeItemList;
  const firstId = data.length > 0 ? getId(data[0]) : 0;
  const [selectedNodeId, setSelectedNodeId] = React.useState(firstId);
  const [focusVisible, setFocusVisible] = React.useState(false);
  const [typeAheadChars, setTypeAheadChars] = React.useState("");
  const timeOutRef = React.useRef(null);
  const treeItemRefs: { [key: TreeNodeIdT]: ReactRefT<HTMLLIElement> } = {};

  const focusTreeItem = (id: TreeNodeIdT | null) => {
    if (!id) return;
    setSelectedNodeId(id);

    const refs = treeItemRefs[id];
    const node = refs && refs.current;
    if (node) node.focus();
  };

  const onKeyDown = (e: KeyboardEvent, node: TreeNodeT<>) => {
    const elementId = e.target.dataset.nodeid;
    // this check prevents bubbling
    if (elementId !== getId(node) && Number.parseInt(elementId) !== getId(node)) {
      return;
    }
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        if (typeof node.isExpanded === "boolean" && !node.isExpanded) {
          onToggle && onToggle(node);
        } else {
          focusTreeItem(getFirstChildId(data, selectedNodeId, getId));
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (typeof node.isExpanded === "boolean" && node.isExpanded) {
          onToggle && onToggle(node);
        } else {
          focusTreeItem(getParentId(data, selectedNodeId, null, getId));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        focusTreeItem(getPrevId(data, selectedNodeId, null, getId));
        break;
      case "ArrowDown":
        e.preventDefault();
        focusTreeItem(getNextId(data, selectedNodeId, null, getId));
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        onToggle && onToggle(node);
        break;
      case "Home":
        e.preventDefault();
        if (data.length > 0) {
          focusTreeItem(getId(data[0]));
        }
        break;
      case "End":
        e.preventDefault();
        focusTreeItem(getEndId(data, getId));
        break;
      case "*":
        e.preventDefault();
        for (const node of getExpandableSiblings(data, selectedNodeId, getId))
          onToggle && onToggle(node);
        break;
      default:
        if (timeOutRef.current !== null) {
          clearTimeout(timeOutRef.current);
        }
        setTypeAheadChars(typeAheadChars + e.key);
        timeOutRef.current = setTimeout(() => {
          setTypeAheadChars("");
        }, 500);

        focusTreeItem(
          getCharMatchId(data, selectedNodeId, typeAheadChars + e.key, null, getId)
        );
        break;
    }
  };

  const onFocus = (event: SyntheticEvent<>) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
    if (selectedNodeId === null && data.length > 0) {
      setSelectedNodeId(getId(data[0]));
    }
  };

  const onBlur = (event: SyntheticEvent<>) => {
    if (focusVisible) {
      setFocusVisible(false);
    }
  };

  return (
    <Root role="tree" {...getOverrideProps(RootOverride)}>
      {data.map((node) => {
        return (
          <TreeNode
            indentGuides={indentGuides}
            key={getId(node)}
            node={node}
            getId={getId}
            onToggle={(node) => {
              onToggle && onToggle(node);
              focusTreeItem(getId(node));
            }}
            overrides={overrides}
            renderAll={renderAll}
            selectedNodeId={selectedNodeId}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            addRef={(id, ref) => {
              treeItemRefs[id] = ref;
            }}
            removeRef={(id: TreeNodeIdT) => {
              delete treeItemRefs[id];
            }}
            isFocusVisible={focusVisible}
          />
        );
      })}
    </Root>
  );
}
