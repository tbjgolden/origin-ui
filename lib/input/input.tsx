import React from "react";
import { getOverrides } from "../helpers/overrides";
import { getSharedProps } from "./utils";
import BaseInput from "./base-input";
import {
  Root as StyledRoot,
  InputEnhancer as StyledInputEnhancer,
} from "./styled-components";
import { SIZE, ADJOINED, ENHANCER_POSITION } from "./constants";
class Input extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isFocused: this.props.autoFocus || false,
    };
    this.onFocus = (e) => {
      this.setState({ isFocused: true });
      this.props.onFocus(e);
    };
    this.onBlur = (e) => {
      this.setState({ isFocused: false });
      this.props.onBlur(e);
    };
  }
  render() {
    const {
      startEnhancer,
      endEnhancer,
      overrides: {
        Root: RootOverride,
        StartEnhancer: StartEnhancerOverride,
        EndEnhancer: EndEnhancerOverride,
        ...restOverrides
      },
      ...restProps
    } = this.props;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [StartEnhancer, startEnhancerProps] = getOverrides(
      StartEnhancerOverride,
      StyledInputEnhancer
    );
    const [EndEnhancer, endEnhancerProps] = getOverrides(
      EndEnhancerOverride,
      StyledInputEnhancer
    );
    const sharedProps = getSharedProps(this.props, this.state);
    if (__DEV__ && this.props.error && this.props.positive) {
      console.warn(
        `[Input] \`error\` and \`positive\` are both set to \`true\`. \`error\` will take precedence but this may not be what you want.`
      );
    }
    return (
      <Root
        data-baseweb="input"
        {...sharedProps}
        {...rootProps}
        $adjoined={getAdjoinedProp(startEnhancer, endEnhancer)}
        $hasIconTrailing={this.props.clearable || this.props.type == "password"}
      >
        {isEnhancer(startEnhancer) && (
          <StartEnhancer
            {...sharedProps}
            {...startEnhancerProps}
            $position={ENHANCER_POSITION.start}
          >
            {typeof startEnhancer === "function"
              ? startEnhancer(sharedProps)
              : startEnhancer}
          </StartEnhancer>
        )}
        <BaseInput
          {...restProps}
          overrides={restOverrides}
          adjoined={getAdjoinedProp(startEnhancer, endEnhancer)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {isEnhancer(endEnhancer) && (
          <EndEnhancer
            {...sharedProps}
            {...endEnhancerProps}
            $position={ENHANCER_POSITION.end}
          >
            {typeof endEnhancer === "function" ? endEnhancer(sharedProps) : endEnhancer}
          </EndEnhancer>
        )}
      </Root>
    );
  }
}
Input.defaultProps = {
  autoComplete: "on",
  autoFocus: false,
  disabled: false,
  name: "",
  onBlur: () => {},
  onFocus: () => {},
  overrides: {},
  required: false,
  size: SIZE.default,
  startEnhancer: null,
  endEnhancer: null,
  clearable: false,
  type: "text",
};
function getAdjoinedProp(startEnhancer, endEnhancer) {
  if (isEnhancer(startEnhancer) && isEnhancer(endEnhancer)) {
    return ADJOINED.both;
  } else if (isEnhancer(startEnhancer)) {
    return ADJOINED.left;
  } else if (isEnhancer(endEnhancer)) {
    return ADJOINED.right;
  }
  return ADJOINED.none;
}
function isEnhancer(enhancer) {
  return Boolean(enhancer || enhancer === 0);
}
export default Input;
