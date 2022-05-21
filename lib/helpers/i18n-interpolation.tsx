export default function getInterpolatedString(translation, interpolations = {}) {
  return translation.replace(/\${(.*?)}/g, (_, k) => {
    return interpolations[k] === void 0 ? "${" + k + "}" : interpolations[k];
  });
}
