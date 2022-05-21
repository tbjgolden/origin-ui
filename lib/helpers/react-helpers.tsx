import * as React from "react";
import { isFragment } from "react-is";
export const flattenFragments = (children, ChildWrapper, depth = 0) => {
  return React.Children.toArray(children).reduce((acc, child, i) => {
    if (isFragment(child)) {
      acc.push(...flattenFragments(child.props.children, ChildWrapper, depth + 1));
    } else if (React.isValidElement(child)) {
      if (ChildWrapper) {
        acc.push(<ChildWrapper key={`${depth}.${i}`}>{child}</ChildWrapper>);
      } else {
        acc.push(child);
      }
    }
    return acc;
  }, []);
};
