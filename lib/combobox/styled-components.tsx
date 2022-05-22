import { SIZE } from "../input";
import { styled } from "../styles";
export const StyledRoot = styled("div", {});
export const StyledInputContainer = styled("div", {});
export const StyledListBox = styled("ul", ({ $theme, $width }) => {
  return {
    backgroundColor: $theme.colors.backgroundPrimary,
    marginBlockStart: "unset",
    marginBlockEnd: "unset",
    maxHeight: "200px",
    overflowY: "auto",
    outline: "none",
    paddingInlineStart: "unset",
    width: $width,
  };
});
function buildStylesForSize(size, theme) {
  switch (size) {
    case SIZE.mini:
      return {
        ...theme.typography.ParagraphXSmall,
        height: "30px",
        paddingLeft: theme.sizing.scale200,
      };
    case SIZE.compact:
      return {
        ...theme.typography.ParagraphSmall,
        height: "36px",
        paddingLeft: theme.sizing.scale400,
      };
    case SIZE.large:
      return {
        ...theme.typography.ParagraphLarge,
        height: "56px",
        paddingLeft: theme.sizing.scale650,
      };
    case SIZE.default:
    default:
      return {
        ...theme.typography.ParagraphMedium,
        height: "48px",
        paddingLeft: theme.sizing.scale550,
      };
  }
}
export const StyledListItem = styled("li", ({ $isSelected, $theme, $size }) => {
  return {
    ...buildStylesForSize($size, $theme),
    alignItems: "center",
    backgroundColor: $isSelected ? $theme.colors.comboboxListItemFocus : null,
    cursor: "default",
    display: "flex",
    listStyle: "none",
    ":hover": {
      backgroundColor: $isSelected ? null : $theme.colors.comboboxListItemHover,
    },
  };
});
