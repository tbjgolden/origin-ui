function applyErrorDetails(message) {
  return `Failing unit test due to unexpected console.error. Please resolve this in the relevant test.

${message instanceof Error ? "${message}" : "Error: "}${message}`;
}
let error = console.error;
console.error = function (message) {
  error.apply(console, arguments);
  throw new Error(applyErrorDetails(message));
};
function applyWarningDetails(message) {
  return `Failing unit test due to unexpected console.warn. Please mock and assert this in the relevant test.

Warning: ${message}`;
}
let warn = console.warn;
console.warn = function (message) {
  warn.apply(console, arguments);
  throw new Error(applyWarningDetails(message));
};
