export function hexToRgb(hex = "", alpha = "1") {
  const shorthandRegex = /^#?([\da-f])([\da-f])([\da-f])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  return result ? `rgba(${Number.parseInt(result[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}, ${alpha})` : null;
}
export const ellipsisText = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  wordWrap: "normal"
};
export function expandBorderStyles(borderStyles) {
  return {
    borderTopWidth: borderStyles.borderWidth,
    borderTopStyle: borderStyles.borderStyle,
    borderTopColor: borderStyles.borderColor,
    borderBottomWidth: borderStyles.borderWidth,
    borderBottomStyle: borderStyles.borderStyle,
    borderBottomColor: borderStyles.borderColor,
    borderLeftWidth: borderStyles.borderWidth,
    borderLeftStyle: borderStyles.borderStyle,
    borderLeftColor: borderStyles.borderColor,
    borderRightWidth: borderStyles.borderWidth,
    borderRightStyle: borderStyles.borderStyle,
    borderRightColor: borderStyles.borderColor
  };
}
