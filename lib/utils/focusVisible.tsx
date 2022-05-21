let initialized = false;
let hadKeyboardEvent = true;
let hadFocusVisibleRecently = false;
let hadFocusVisibleRecentlyTimeout = null;
const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true,
};
function focusTriggersKeyboardModality(node) {
  const { type, tagName } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden" && hadFocusVisibleRecently) {
    hadKeyboardEvent = true;
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
export function teardown(doc) {
  doc.removeEventListener("keydown", handleKeyDown, true);
  doc.removeEventListener("mousedown", handlePointerDown, true);
  doc.removeEventListener("pointerdown", handlePointerDown, true);
  doc.removeEventListener("touchstart", handlePointerDown, true);
  doc.removeEventListener("visibilitychange", handleVisibilityChange, true);
}
export function isFocusVisible(event) {
  try {
    return event.target.matches(":focus-visible");
  } catch {}
  return hadKeyboardEvent || focusTriggersKeyboardModality(event.target);
}
export function handleBlurVisible() {
  hadFocusVisibleRecently = true;
  if (__BROWSER__) {
    window.clearTimeout(hadFocusVisibleRecentlyTimeout);
    hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
      hadFocusVisibleRecently = false;
    }, 100);
  }
}
export function initFocusVisible(node) {
  if (!initialized && node != null) {
    initialized = true;
    prepare(node.ownerDocument);
  }
}
export const forkFocus = (rootProps, handler) => {
  return (e) => {
    if (typeof rootProps.onFocus === "function") {
      rootProps.onFocus(e);
    }
    handler(e);
  };
};
export const forkBlur = (rootProps, handler) => {
  return (e) => {
    if (typeof rootProps.onBlur === "function") {
      rootProps.onBlur(e);
    }
    handler(e);
  };
};
