
import * as React from "react";
import type { ThemeT } from "../styles/types.js";
import type { OverrideT } from "../helpers/overrides.js";

export type BaseProviderPropsT = {
  /** Children element to be rendered. Normally the BaseProvider
   should be added at the top level of an application. */
  children: ?React.Node,
  overrides?: {
    AppContainer?: OverrideT,
    LayersContainer?: OverrideT,
  },
  /** The base theme to be used in the application. */
  theme: ThemeT,
  /** A value of z-index to be set on the layers. */
  zIndex?: number,
};