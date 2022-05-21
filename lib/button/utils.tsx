export function getSharedProps({
  colors,
  disabled,
  isLoading,
  isSelected,
  kind,
  shape,
  size,
}) {
  return {
    $colors: colors,
    $disabled: disabled,
    $isLoading: isLoading,
    $isSelected: isSelected,
    $kind: kind,
    $shape: shape,
    $size: size,
  };
}
