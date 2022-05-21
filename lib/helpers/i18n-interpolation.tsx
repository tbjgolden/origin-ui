// Example:
// getInterpolatedString('Selected date is ${date}', 'Jan 1, 2020') => 'Selected date is Jan 1, 2020'
export default function getInterpolatedString(
  translation: string,
  interpolations: { [string]: string } = {}
): string {
  return translation.replace(/\${(.*?)}/g, (_, k) =>
    interpolations[k] === undefined ? "${" + k + "}" : interpolations[k]
  );
}
