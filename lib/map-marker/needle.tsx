import * as React from "react";
import { getOverrides } from "../helpers/overrides";
import { NEEDLE_HEIGHTS } from "./constants";
import { StyledNeedle } from "./styled-components";
import type { NeedlePropsT } from "./types";

const Needle = ({ size, background, overrides = {} }: NeedlePropsT) => {
  const [Needle, needleProps] = getOverrides(overrides.Needle, StyledNeedle);
  return (
    <Needle $background={background} $height={NEEDLE_HEIGHTS[size]} {...needleProps} />
  );
};

export default Needle;
