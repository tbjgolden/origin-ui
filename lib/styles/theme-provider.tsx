import React from "react";
export const ThemeContext = React.createContext(Theme);
const ThemeProvider = (props) => {
  return <ThemeContext.Provider value={Theme}>{props.children}</ThemeContext.Provider>;
};
export default ThemeProvider;
