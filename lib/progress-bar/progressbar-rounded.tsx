import React from "react";
import { SIZE } from "./constants";
import {
  StyledProgressBarRoundedRoot,
  StyledProgressBarRoundedSvg,
  StyledProgressBarRoundedTrackBackground,
  StyledProgressBarRoundedTrackForeground,
  StyledProgressBarRoundedText,
} from "./styled-components";
import { useOverrides } from "../helpers/overrides";
const defaults = {
  Root: StyledProgressBarRoundedRoot,
  Svg: StyledProgressBarRoundedSvg,
  TrackBackground: StyledProgressBarRoundedTrackBackground,
  TrackForeground: StyledProgressBarRoundedTrackForeground,
  Text: StyledProgressBarRoundedText,
};
function roundTo(n, digits) {
  if (digits === void 0) {
    digits = 0;
  }
  const multiplicator = Math.pow(10, digits);
  n = Number.parseFloat((n * multiplicator).toFixed(11));
  const test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
}
function ProgressBarRounded({
  progress = 0,
  size = SIZE.medium,
  animate = true,
  inline = false,
  overrides = {},
  ...restProps
}) {
  const {
    Root: [Root, rootProps],
    Svg: [Svg, svgProps],
    TrackBackground: [TrackBackground, trackBackgroundProps],
    TrackForeground: [TrackForeground, trackForegroundProps],
    Text: [Text, textProps],
  } = useOverrides(defaults, overrides);
  const [pathLength, setPathLength] = React.useState(0);
  const pathRef = React.useRef();
  React.useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);
  const animationFrameRef = React.useRef();
  const [pathProgress, setPathProgress] = React.useState(0);
  React.useEffect(() => {
    if (!animate) {
      setPathProgress(progress);
      return;
    }
    if (window && animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    const animationDuration = Math.max(1e3 * (progress - pathProgress), 250);
    let animationTimeStarted;
    function loop(now = 0) {
      if (!animationTimeStarted) {
        animationTimeStarted = now;
      }
      const animationTimeElapsed = now - animationTimeStarted;
      let currentPathProgress = Math.min(
        (progress - pathProgress) * (animationTimeElapsed / animationDuration) +
          pathProgress,
        1
      );
      currentPathProgress = Math.max(currentPathProgress, 0);
      setPathProgress(currentPathProgress);
      if (animationTimeElapsed <= animationDuration) {
        animationFrameRef.current = window.requestAnimationFrame(loop);
      }
    }
    loop();
  }, [progress]);
  return (
    <Root
      data-baseweb="progressbar-rounded"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={1}
      $size={size}
      $inline={inline}
      {...restProps}
      {...rootProps}
    >
      <Svg $size={size} {...restProps} {...svgProps}>
        <TrackBackground $size={size} {...trackBackgroundProps} />
        <TrackForeground
          ref={pathRef}
          $size={size}
          $visible={!!pathRef.current}
          $pathLength={pathLength}
          $pathProgress={pathProgress}
          {...trackForegroundProps}
        />
      </Svg>
      <Text $size={size} {...textProps}>
        {roundTo(Math.min(progress * 100, 100))}
        {"%"}
      </Text>
    </Root>
  );
}
export default ProgressBarRounded;
