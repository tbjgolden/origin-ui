import { getOverrides } from "../helpers/overrides";
import { NEEDLE_HEIGHTS } from "./constants";
import { StyledNeedle } from "./styled-components";
const Needle = ({ size, background, overrides = {} }) => {
  const [Needle2, needleProps] = getOverrides(overrides.Needle, StyledNeedle);
  return (
    <Needle2 $background={background} $height={NEEDLE_HEIGHTS[size]} {...needleProps} />
  );
};
export default Needle;
