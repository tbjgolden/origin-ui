import * as React from "react";
import { UIDReset } from "react-uid";
import { LayersManager } from "../layer/index";
import { ThemeProvider } from "../styles/index";
import type { BaseProviderPropsT } from "./types";

const BaseProvider = (props: BaseProviderPropsT) => {
  const { children, overrides, theme, zIndex } = props;
  return (
    <LayersManager zIndex={zIndex} overrides={overrides}>
      <UIDReset prefix="bui">
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </UIDReset>
    </LayersManager>
  );
};

export default BaseProvider;
