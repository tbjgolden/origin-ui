import { getOverrides } from "../helpers/overrides";
import { StyledBadgeEnhancerRoot } from "./styled-components";
import {
  PINHEAD_TYPES,
  BADGE_ENHANCER_SIZES,
  BADGE_ENHANCER_POSITIONS,
  BADGE_ENHANCER_CONTENT_SIZE,
} from "./constants";
const BadgeEnhancer = ({
  pinHeadSize,
  markerType,
  badgeEnhancerSize = BADGE_ENHANCER_SIZES.none,
  badgeEnhancerContent: BadgeEnhancerContent,
  overrides = {},
}) => {
  if (badgeEnhancerSize === null || badgeEnhancerSize == BADGE_ENHANCER_SIZES.none) {
    return null;
  }
  if (badgeEnhancerSize !== BADGE_ENHANCER_SIZES.xSmall && !BadgeEnhancerContent) {
    if (__DEV__) {
      console.warn(
        `Badges (except for size ${BADGE_ENHANCER_SIZES.xSmall}) must contain content`
      );
    }
    return null;
  }
  if (markerType === PINHEAD_TYPES.floating) {
    if (__DEV__) {
      console.warn(`Badges can only be rendered on fixed markers`);
    }
    return null;
  }
  const positions = BADGE_ENHANCER_POSITIONS[pinHeadSize];
  const position = positions ? positions[badgeEnhancerSize] : null;
  if (!position) {
    if (__DEV__) {
      console.warn(
        `Badge size ${badgeEnhancerSize} cannot be rendered with pinhead size ${pinHeadSize}`
      );
    }
    return null;
  }
  const [BadgeEnhancerRoot, badgeEnhancerRootProps] = getOverrides(
    overrides.BadgeEnhancer,
    StyledBadgeEnhancerRoot
  );
  return (
    <BadgeEnhancerRoot
      $size={badgeEnhancerSize}
      $position={position}
      {...badgeEnhancerRootProps}
    >
      {BadgeEnhancerContent && badgeEnhancerSize !== BADGE_ENHANCER_SIZES.xSmall && (
        <BadgeEnhancerContent size={BADGE_ENHANCER_CONTENT_SIZE[badgeEnhancerSize]} />
      )}
    </BadgeEnhancerRoot>
  );
};
export default BadgeEnhancer;
