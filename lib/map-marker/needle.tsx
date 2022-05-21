import * as React from "react";
import { getOverrides } from "../helpers/overrides.js";
import { NEEDLE_HEIGHTS } from "./constants.js";
import { StyledNeedle } from "./styled-components.js";
import type { NeedlePropsT } from "./types.js";

const Needle = ({ size, background, overrides = {} }: NeedlePropsT) => {
  const [Needle, needleProps] = getOverrides(overrides.Needle, StyledNeedle);
  return (
    <Needle $background={background} $height={NEEDLE_HEIGHTS[size]} {...needleProps} />
  );
};

export default Needle;
