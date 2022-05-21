import * as React from "react";
import type { HeadingLevelPropsT } from "./types";

export const LevelContext: React.Context<number> = React.createContext(0);

export const HeadingLevel = ({ children }: HeadingLevelPropsT) => {
  return (
    <LevelContext.Consumer>
      {(level) => {
        return (
          <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
        );
      }}
    </LevelContext.Consumer>
  );
};

export default HeadingLevel;
