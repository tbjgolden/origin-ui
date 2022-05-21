import { ARTWORK_SIZES } from "./constants";
export function artworkSizeToValue(artworkSize, isSublist) {
  if (isSublist) {
    switch (artworkSize) {
      case ARTWORK_SIZES.LARGE:
        return 24;
      case ARTWORK_SIZES.SMALL:
      default:
        return 16;
    }
  }
  switch (artworkSize) {
    case ARTWORK_SIZES.SMALL:
      return 16;
    case ARTWORK_SIZES.LARGE:
      return 36;
    case ARTWORK_SIZES.MEDIUM:
    default:
      return 24;
  }
}
