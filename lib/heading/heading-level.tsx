

import * as React from "react";
import type { HeadingLevelPropsT } from "./types.js";

export const LevelContext: React.Context<number> = React.createContext(0);

export const HeadingLevel = ({ children }: HeadingLevelPropsT) => (
  <LevelContext.Consumer>
    {(level) => (
      <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
    )}
  </LevelContext.Consumer>
);

export default HeadingLevel;
