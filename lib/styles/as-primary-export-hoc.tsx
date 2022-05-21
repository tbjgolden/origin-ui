import * as React from "react";

// transforms props for native styled components adding $ symbol to avoid to supported warning
export default function asPrimaryExport(
  StyledComponent: React.ComponentType<{}>,
  propsTransformNames: Array<string>
) {
  return function withStyledPropsHOC(props: {}) {
    const styledProps = Object.keys(props).reduce((acc, key) => {
      if (key[0] === "$" || propsTransformNames.indexOf(key) < 0) {
        acc[key] = props[key];
      } else if (propsTransformNames.indexOf(key) >= 0) {
        acc["$" + key] = props[key];
      }
      return acc;
    }, {});
    return <StyledComponent {...styledProps} />;
  };
}
