


import type { Node } from "react";

import type { OverrideT } from "../helpers/overrides.js";

export type OverridesT = {
  Root?: OverrideT,
  Separator?: OverrideT,
  List?: OverrideT,
  ListItem?: OverrideT,
  Icon?: OverrideT,
};

export type BreadcrumbsPropsT = {|
  children?: Node,
  overrides?: OverridesT,
  ariaLabel?: string,
  "aria-label"?: string,
  /** Whether to show a trailing separator after the last breadcrumb. */
  showTrailingSeparator?: boolean,
|};
