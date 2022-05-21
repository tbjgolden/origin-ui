export default function createMockTheme(base, prefix = "$theme") {
  const mock = {};
  for (const key of Object.keys(base)) {
    const path = `${prefix}.${key}`;
    if (typeof base[key] === "object") {
      mock[key] = createMockTheme(base[key], path);
    } else {
      mock[key] = path;
    }
  }
  return mock;
}
