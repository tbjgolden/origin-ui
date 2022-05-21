import React from "react";
import { LightTheme } from "../themes";
export const ThemeContext = React.createContext(LightTheme);
const ThemeProvider = (props) => {
  const { theme, children } = props;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
export default ThemeProvider;
