import * as valid from "card-validator";
export const addGaps = (gaps, value) => {
  return gaps.reduce((prev, gap, index) => {
    return `${prev.slice(0, gap + index)} ${prev.slice(gap + index)}`.trim();
  }, `${value}`);
};
export const sanitizeNumber = (input) => {
  const number = input.replace(/\D/gi, "");
  const validatedValue = valid.number(number);
  if (validatedValue.card && Array.isArray(validatedValue.card.lengths)) {
    return number.slice(
      0,
      validatedValue.card.lengths[validatedValue.card.lengths.length - 1]
    );
  }
  return number.slice(0, 19);
};
export const getCaretPosition = (value, prevValue, position) => {
  const cleanValue = sanitizeNumber(value);
  const validatedValue = valid.number(cleanValue);
  if (validatedValue.card && Array.isArray(validatedValue.card.gaps)) {
    const gaps = validatedValue.card.gaps;
    const valueWithGaps = addGaps(gaps, cleanValue);
    if (cleanValue.length > prevValue.length && valueWithGaps[position - 1] === " ") {
      return [position + 1, cleanValue];
    }
  }
  const prevValidatedValue = valid.number(prevValue);
  if (prevValidatedValue.card && Array.isArray(prevValidatedValue.card.gaps)) {
    const gaps = prevValidatedValue.card.gaps;
    const valueWithGaps = addGaps(gaps, prevValue);
    if (prevValue === cleanValue && valueWithGaps.length > value.length) {
      const newValue =
        valueWithGaps.slice(0, position - 1) + valueWithGaps.slice(position);
      return [position - 1, sanitizeNumber(newValue)];
    }
  }
  return [position, cleanValue];
};
