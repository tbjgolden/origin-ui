// flowlint-next-line unclear-type:off
export default function omitDollarPrefixedKeys(source: { [string]: any }) {
  const result = {};

  for (const key in source) {
    if (key[0] !== "$") {
      result[key] = source[key];
    }
  }

  return result;
}
