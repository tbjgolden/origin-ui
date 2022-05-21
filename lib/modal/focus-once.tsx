import * as React from "react";
export default function FocusOnce(props) {
  const [tabIndex, setTabIndex] = React.useState("0");
  const child = React.Children.only(props.children);
  return React.cloneElement(child, { tabIndex, onBlur: () => setTabIndex(null) });
}
