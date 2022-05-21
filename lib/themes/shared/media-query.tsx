import { getMediaQuery } from "../../helpers/responsive-helpers";
import breakpoints from "./breakpoints";
import type { MediaQueryT } from "../types";

const mediaQuery: MediaQueryT = {
  small: getMediaQuery(breakpoints.small),
  medium: getMediaQuery(breakpoints.medium),
  large: getMediaQuery(breakpoints.large),
};

export default mediaQuery;
