const ISO_REGEX = /^[a-z]{2}$/i;
const OFFSET = 127397;
export function iso2FlagEmoji(iso) {
  if (!ISO_REGEX.test(iso)) {
    const type = typeof iso;
    if (__DEV__) {
      console.warn(
        `iso argument must be an ISO 3166-1 alpha-2 string, but got '${
          type === "string" ? iso : type
        }' instead.`
      );
    }
    return;
  }
  const chars = Array.from(iso.toUpperCase()).map((char) => char.charCodeAt(0) + OFFSET);
  return String.fromCodePoint(...chars);
}
