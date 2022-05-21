export function getSharedProps(props, state) {
  const { disabled, error, positive, adjoined, size, required } = props;
  const { isFocused } = state;
  return {
    $isFocused: isFocused,
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $adjoined: adjoined,
    $size: size,
    $required: required
  };
}
