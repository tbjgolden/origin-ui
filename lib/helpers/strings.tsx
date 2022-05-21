export const camelToKebab = (s) => {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};
