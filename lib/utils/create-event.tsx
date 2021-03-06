export default function createEvent(eventName) {
  let event;
  if (typeof window.Event === "function") {
    event = new window.Event(eventName, { bubbles: true, cancelable: true });
  } else {
    event = document.createEvent("Event");
    event.initEvent(eventName, true, true);
  }
  return event;
}
