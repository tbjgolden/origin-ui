import * as React from "react";
import type { StatefulContainerPropsT, TreeNodeT } from "./types";

type StateType = {
  data: TreeNodeT<>[];
};

const findSiblings = (node: TreeNodeT<>, children: TreeNodeT<>[]): ?TreeNodeT<>[] => {
  if (children.includes(node)) {
    return children;
  }
  for (const child of children) {
    if (child.children) {
      const siblings = findSiblings(node, child.children);
      if (siblings != null) {
        return siblings;
      }
    }
  }
  return null;
};

export default class StatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StateType
> {
  state: StateType;

  constructor(props: StatefulContainerPropsT) {
    super(props);
    this.state = { data: this.props.data };
  }

  onToggle = (node: TreeNodeT<>) => {
    const { onToggle, singleExpanded } = this.props;
    this.setState(
      (prevState) => {
        const shouldExpand = !node.isExpanded;
        if (singleExpanded && shouldExpand) {
          const siblings = findSiblings(node, prevState.data);
          if (siblings != null) {
            for (const sibling of siblings) {
              if (sibling !== node) {
                sibling.isExpanded = false;
              }
            }
          }
        }
        node.isExpanded = shouldExpand;
        return { data: prevState.data };
      },
      () => {
        onToggle && onToggle(node);
      }
    );
  };

  render() {
    const { children, ...restProps } = this.props;
    const { onToggle } = this;
    return children(
      Object.freeze({
        ...restProps,
        ...this.state,
        onToggle,
      })
    );
  }
}
