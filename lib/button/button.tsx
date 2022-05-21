import React from "react";
import {
  BaseButton as StyledBaseButton,
  LoadingSpinner as StyledLoadingSpinner,
  LoadingSpinnerContainer as StyledLoadingSpinnerContainer,
} from "./styled-components";
import { getSharedProps } from "./utils";
import ButtonInternals from "./button-internals";
import { defaultProps } from "./default-props";
import { getOverrides } from "../helpers/overrides";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
class Button extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { isFocusVisible: false };
    this.internalOnClick = (...args) => {
      const { isLoading, onClick } = this.props;
      if (isLoading) {
        args[0].preventDefault();
        return;
      }
      onClick && onClick(...args);
    };
    this.handleFocus = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisible: true });
      }
    };
    this.handleBlur = (event) => {
      if (this.state.isFocusVisible !== false) {
        this.setState({ isFocusVisible: false });
      }
    };
  }
  render() {
    const {
      overrides = {},
      size,
      kind,
      shape,
      isLoading,
      isSelected,
      startEnhancer,
      endEnhancer,
      children,
      forwardedRef,
      ...restProps
    } = this.props;
    const [BaseButton, baseButtonProps] = getOverrides(
      overrides.BaseButton || overrides.Root,
      StyledBaseButton
    );
    const [LoadingSpinner, loadingSpinnerProps] = getOverrides(
      overrides.LoadingSpinner,
      StyledLoadingSpinner
    );
    const [LoadingSpinnerContainer, loadingSpinnerContainerProps] = getOverrides(
      overrides.LoadingSpinnerContainer,
      StyledLoadingSpinnerContainer
    );
    const sharedProps = {
      ...getSharedProps(this.props),
      $isFocusVisible: this.state.isFocusVisible,
    };
    return (
      <BaseButton
        ref={forwardedRef}
        data-baseweb="button"
        {...(isLoading
          ? {
              ["aria-label"]: `loading ${
                typeof this.props.children === "string" ? this.props.children : ""
              }`,
              ["aria-busy"]: "true",
            }
          : {})}
        {...sharedProps}
        {...restProps}
        {...baseButtonProps}
        onClick={this.internalOnClick}
        onFocus={forkFocus({ ...restProps, ...baseButtonProps }, this.handleFocus)}
        onBlur={forkBlur({ ...restProps, ...baseButtonProps }, this.handleBlur)}
      >
        {isLoading ? (
          <React.Fragment>
            <div style={{ opacity: 0, display: "flex", height: "0px" }}>
              <ButtonInternals {...this.props} />
            </div>
            <LoadingSpinnerContainer {...sharedProps} {...loadingSpinnerContainerProps}>
              <LoadingSpinner {...sharedProps} {...loadingSpinnerProps} />
            </LoadingSpinnerContainer>
          </React.Fragment>
        ) : (
          <ButtonInternals {...this.props} />
        )}
      </BaseButton>
    );
  }
}
Button.defaultProps = defaultProps;
const ForwardedButton = React.forwardRef((props, ref) => {
  return <Button forwardedRef={ref} {...props} />;
});
ForwardedButton.displayName = "Button";
export default ForwardedButton;
