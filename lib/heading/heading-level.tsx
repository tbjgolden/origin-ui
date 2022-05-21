import * as React from "react";
export const LevelContext = React.createContext(0);
export const HeadingLevel = ({ children }) => {
  return <LevelContext.Consumer>{(level) => {
    return <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>;
  }}</LevelContext.Consumer>;
};
export default HeadingLevel;
