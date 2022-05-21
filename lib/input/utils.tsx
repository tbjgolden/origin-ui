
import type {
  InputPropsT,
  BaseInputPropsT,
  InternalStateT,
  SharedPropsT,
} from "./types.js";

export function getSharedProps<T>(
  props: BaseInputPropsT<T> | InputPropsT,
  state: InternalStateT
): $Shape<SharedPropsT> {
  const { disabled, error, positive, adjoined, size, required } = props;
  const { isFocused } = state;
  return {
    $isFocused: isFocused,
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $adjoined: adjoined,
    $size: size,
    $required: required,
  };
}
