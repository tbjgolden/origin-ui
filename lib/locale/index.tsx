
import * as React from "react";
import extend from "just-extend";

import type { LocaleT } from "./types.js";
import en_US from "./en_US.js";

export const LocaleContext: React.Context<LocaleT> = React.createContext(en_US);

const LocaleProvider = (props: { locale: $Shape<LocaleT>, children: ?React.Node }) => {
  const { locale, children } = props;
  return (
    <LocaleContext.Provider value={extend({}, en_US, locale)}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;