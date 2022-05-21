
import * as React from "react";

type Props = {
  children: React.Node,
};

/**
 * Wrap an element in FocusOnce that would normally not receive tab focus.
 * This is useful for placing initial focus in a Modal or FocusLock.
 * */
export default function FocusOnce(props: Props) {
  const [tabIndex, setTabIndex] = React.useState("0");
  const child = React.Children.only(props.children);
  return React.cloneElement(child, { tabIndex, onBlur: () => setTabIndex(null) });
}