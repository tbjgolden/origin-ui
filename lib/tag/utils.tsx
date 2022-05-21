import * as React from "react";
const JOINABLE_TYPES = /* @__PURE__ */ new Set(["string", "number"]);
export function getTextFromChildren(children) {
  const childList = React.Children.toArray(children).filter(
    (child) => child !== null && child !== void 0
  );
  if (!childList.length) {
    return null;
  }
  const isJoinable = childList.every((child) => JOINABLE_TYPES.has(typeof child));
  if (!isJoinable) {
    return null;
  }
  return childList.join("");
}
