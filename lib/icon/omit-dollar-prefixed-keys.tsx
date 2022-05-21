export default function omitDollarPrefixedKeys(source) {
  const result = {};
  for (const key in source) {
    if (key[0] !== "$") {
      result[key] = source[key];
    }
  }
  return result;
}
