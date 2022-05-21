import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import BaseProvider from "../helpers/base-provider";
import { ThemeProvider } from "../styles";
import { LightTheme } from "../themes";
const engine = new Styletron();
export const withStyletronProvider = (Component) => {
  return function withStyletronProviderHOC(props) {
    return <StyletronProvider value={engine}><Component {...props} /></StyletronProvider>;
  };
};
export const withThemeProvider = (Component) => {
  return function withThemeProviderHOC(props) {
    return <ThemeProvider theme={LightTheme}><Component {...props} /></ThemeProvider>;
  };
};
export const withAll = (Component) => {
  return <StyletronProvider value={engine}><ThemeProvider theme={LightTheme}>{Component()}</ThemeProvider></StyletronProvider>;
};
export function TestBaseProvider({ children }) {
  return <BaseProvider theme={LightTheme}>{children}</BaseProvider>;
}
