import * as React from "react";
import * as ReactIs from "react-is";
import {
  StartEnhancer as StyledStartEnhancer,
  EndEnhancer as StyledEndEnhancer,
} from "./styled-components";
import { getSharedProps } from "./utils";
import { getOverrides } from "../helpers/overrides";
function RenderEnhancer(props) {
  const { Enhancer, ...restProps } = props;
  if (typeof Enhancer === "string") {
    return Enhancer;
  }
  if (ReactIs.isValidElementType(Enhancer)) {
    return <Enhancer {...restProps} />;
  }
  return Enhancer;
}
export default function ButtonInternals(props) {
  const { children, overrides = {}, startEnhancer, endEnhancer } = props;
  const [StartEnhancer, startEnhancerProps] = getOverrides(
    overrides.StartEnhancer,
    StyledStartEnhancer
  );
  const [EndEnhancer, endEnhancerProps] = getOverrides(
    overrides.EndEnhancer,
    StyledEndEnhancer
  );
  const sharedProps = getSharedProps(props);
  return (
    <React.Fragment>
      {startEnhancer !== null && startEnhancer !== void 0 && (
        <StartEnhancer {...sharedProps} {...startEnhancerProps}>
          <RenderEnhancer Enhancer={startEnhancer} />
        </StartEnhancer>
      )}
      {children}
      {endEnhancer !== null && endEnhancer !== void 0 && (
        <EndEnhancer {...sharedProps} {...endEnhancerProps}>
          <RenderEnhancer Enhancer={endEnhancer} />
        </EndEnhancer>
      )}
    </React.Fragment>
  );
}
