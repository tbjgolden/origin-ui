
import * as React from "react";
import { LightTheme } from "../themes/index.js";

import type { ThemeT } from "./types.js";

export const ThemeContext: React.Context<ThemeT> = React.createContext(LightTheme);

const ThemeProvider = (props: { theme: ThemeT, children: ?React.Node }) => {
  const { theme, children } = props;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
