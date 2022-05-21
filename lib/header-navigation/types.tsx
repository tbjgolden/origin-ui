import type { OverrideT } from "../helpers/overrides.js";

export type OverridesT = {
  Root?: OverrideT;
};

export type PropsT = {
  overrides: OverridesT;
};
