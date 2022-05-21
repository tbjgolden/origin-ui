export const camelToKebab = (s) => s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
