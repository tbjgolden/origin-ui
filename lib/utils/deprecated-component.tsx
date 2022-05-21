import React from "react";
export default function (Component, displayName) {
  const DeprecatedComponent = React.forwardRef((props, ref) => {
    if (__DEV__) {
      console.warn(
        `We have stabilized the ${displayName} component, so you can drop the "Unstable_" prefix from your imports. We will remove the "Unstable_" exports soon, so please make these changes as soon as possible!`
      );
    }
    return <Component {...props} ref={ref} />;
  });
  DeprecatedComponent.displayName = "DeprecatedComponent";
  return DeprecatedComponent;
}
