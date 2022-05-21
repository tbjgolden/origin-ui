import React from "react";
import { getOverrides } from "../helpers/overrides";
import { SIZE } from "./constants";
import {
  StyledRoot,
  StyledBarContainer,
  StyledBar,
  StyledLabel,
  StyledBarProgress,
  StyledInfiniteBar,
} from "./styled-components";
class ProgressBar extends React.Component {
  componentDidMount() {
    if (__DEV__ && this.props.errorMessage) {
      console.warn(
        "baseui:ProgressBar The `errorMessage` prop is deprecated in WAI-ARIA v1.2."
      );
    }
  }
  render() {
    const {
      overrides = {},
      getProgressLabel,
      value,
      size,
      steps,
      successValue,
      minValue,
      maxValue,
      showLabel,
      infinite,
      errorMessage,
      forwardedRef,
      ...restProps
    } = this.props;
    const ariaLabel = this.props["aria-label"] || this.props.ariaLabel;
    const maximumValue = maxValue !== 100 ? maxValue : successValue;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [BarContainer, barContainerProps] = getOverrides(
      overrides.BarContainer,
      StyledBarContainer
    );
    const [Bar, barProps] = getOverrides(overrides.Bar, StyledBar);
    const [BarProgress, barProgressProps] = getOverrides(
      overrides.BarProgress,
      StyledBarProgress
    );
    const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
    const [InfiniteBar, infiniteBarProps] = getOverrides(
      overrides.InfiniteBar,
      StyledInfiniteBar
    );
    const sharedProps = {
      $infinite: infinite,
      $size: size,
      $steps: steps,
      $successValue: maximumValue,
      $minValue: minValue,
      $maxValue: maximumValue,
      $value: value,
    };
    function renderProgressBar() {
      const children = [];
      for (let i = 0; i < steps; i++) {
        children.push(
          <Bar key={i} {...sharedProps} {...barProps}>
            <BarProgress $index={i} {...sharedProps} {...barProgressProps} />
          </Bar>
        );
      }
      return children;
    }
    return (
      <Root
        ref={forwardedRef}
        data-baseweb="progress-bar"
        role="progressbar"
        aria-label={ariaLabel || getProgressLabel(value, maximumValue, minValue)}
        aria-valuenow={infinite ? null : value}
        aria-valuemin={infinite ? null : minValue}
        aria-valuemax={infinite ? null : maximumValue}
        aria-invalid={errorMessage ? true : null}
        aria-errormessage={errorMessage}
        {...restProps}
        {...sharedProps}
        {...rootProps}
      >
        <BarContainer {...sharedProps} {...barContainerProps}>
          {infinite ? (
            <React.Fragment>
              <InfiniteBar
                $isLeft={true}
                $size={sharedProps.$size}
                {...infiniteBarProps}
              />
              <InfiniteBar $size={sharedProps.$size} {...infiniteBarProps} />
            </React.Fragment>
          ) : (
            renderProgressBar()
          )}
        </BarContainer>
        {showLabel && (
          <Label {...sharedProps} {...labelProps}>
            {getProgressLabel(value, maximumValue, minValue)}
          </Label>
        )}
      </Root>
    );
  }
}
ProgressBar.defaultProps = {
  getProgressLabel: (value, maxValue, minValue) => {
    return `${Math.round(((value - minValue) / (maxValue - minValue)) * 100)}% Loaded`;
  },
  infinite: false,
  overrides: {},
  showLabel: false,
  size: SIZE.medium,
  steps: 1,
  successValue: 100,
  minValue: 0,
  maxValue: 100,
  value: 0,
};
const ForwardedProgressBar = React.forwardRef((props, ref) => {
  return <ProgressBar forwardedRef={ref} {...props} />;
});
ForwardedProgressBar.displayName = "ProgressBar";
export default ForwardedProgressBar;
