import * as React from "react";
import extend from "just-extend";
import en_US from "./en_US";
export const LocaleContext = React.createContext(en_US);
const LocaleProvider = (props) => {
  const { locale, children } = props;
  return <LocaleContext.Provider value={extend({}, en_US, locale)}>{children}</LocaleContext.Provider>;
};
export default LocaleProvider;
