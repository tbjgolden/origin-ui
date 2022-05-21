export default function createMockTheme(base, prefix = "$theme") {
  const mock = {};
  Object.keys(base).forEach((key) => {
    const path = `${prefix}.${key}`;
    if (typeof base[key] === "object") {
      mock[key] = createMockTheme(base[key], path);
    } else {
      mock[key] = path;
    }
  });
  return mock;
}
