import { styled } from "../styles/index";
import type { SharedStylePropsT } from "./types";

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Root = styled<SharedStylePropsT>("button", (props) => {
  const { $prop, $theme } = props;
  return {
    color: $prop ? $theme.colors.accent : $theme.colors.positive400,
    cursor: "pointer",
  };
});
