import React from "react";
import { Range } from "react-range";
import {
  isFocusVisible as focusVisible,
  forkFocus,
  forkBlur,
} from "../utils/focusVisible";
import {
  Root as StyledRoot,
  Track as StyledTrack,
  InnerTrack as StyledInnerTrack,
  Tick as StyledTick,
  TickBar as StyledTickBar,
  Thumb as StyledThumb,
  InnerThumb as StyledInnerThumb,
  ThumbValue as StyledThumbValue,
  Mark as StyledMark,
} from "./styled-components";
import { getOverrides } from "../helpers/overrides";
import { ThemeContext } from "../styles/theme-provider";
const limitValue = (value) => {
  if (value.length > 2 || value.length === 0) {
    throw new Error(
      "the value prop represents positions of thumbs, so its length can be only one or two"
    );
  }
  return value;
};
function Slider({
  overrides = {},
  disabled = false,
  marks = false,
  onChange = () => {},
  onFinalChange = () => {},
  min = 0,
  max = 100,
  step = 1,
  persistentThumb = false,
  valueToLabel = (label) => {
    return label;
  },
  value: providedValue,
}) {
  const theme = React.useContext(ThemeContext);
  const [isHovered0, setIsHovered0] = React.useState(false);
  const [isHovered1, setIsHovered1] = React.useState(false);
  const [isFocusVisible, setIsFocusVisible] = React.useState(false);
  const [focusedThumbIndex, setFocusedThumbIndex] = React.useState(-1);
  const handleFocus = React.useCallback((event) => {
    if (focusVisible(event)) {
      setIsFocusVisible(true);
    }
    const index = event.target.parentNode.firstChild === event.target ? 0 : 1;
    setFocusedThumbIndex(index);
  }, []);
  const handleBlur = React.useCallback((event) => {
    if (isFocusVisible !== false) {
      setIsFocusVisible(false);
    }
    setFocusedThumbIndex(-1);
  }, []);
  const value = limitValue(providedValue);
  const sharedProps = {
    $disabled: disabled,
    $step: step,
    $min: min,
    $max: max,
    $marks: marks,
    $value: value,
    $isFocusVisible: isFocusVisible,
  };
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Track, trackProps] = getOverrides(overrides.Track, StyledTrack);
  const [InnerTrack, innerTrackProps] = getOverrides(
    overrides.InnerTrack,
    StyledInnerTrack
  );
  const [Thumb, thumbProps] = getOverrides(overrides.Thumb, StyledThumb);
  const [InnerThumb, innerThumbProps] = getOverrides(
    overrides.InnerThumb,
    StyledInnerThumb
  );
  const [ThumbValue, thumbValueProps] = getOverrides(
    overrides.ThumbValue,
    StyledThumbValue
  );
  const [Tick, tickProps] = getOverrides(overrides.Tick, StyledTick);
  const [TickBar, tickBarProps] = getOverrides(overrides.TickBar, StyledTickBar);
  const [Mark, markProps] = getOverrides(overrides.Mark, StyledMark);
  return (
    <Root
      data-baseweb="slider"
      {...sharedProps}
      {...rootProps}
      onFocus={forkFocus(rootProps, handleFocus)}
      onBlur={forkBlur(rootProps, handleBlur)}
    >
      <Range
        step={step}
        min={min}
        max={max}
        values={value}
        disabled={disabled}
        onChange={(value2) => {
          return onChange({ value: value2 });
        }}
        onFinalChange={(value2) => {
          return onFinalChange({ value: value2 });
        }}
        rtl={false}
        renderTrack={({ props, children, isDragged }) => {
          return (
            <Track
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              $isDragged={isDragged}
              {...sharedProps}
              {...trackProps}
            >
              <InnerTrack
                $isDragged={isDragged}
                ref={props.ref}
                {...sharedProps}
                {...innerTrackProps}
              >
                {children}
              </InnerTrack>
            </Track>
          );
        }}
        renderThumb={({ props, index, isDragged }) => {
          const displayLabel = persistentThumb
            ? persistentThumb
            : ((!!index && isHovered1) || (!index && isHovered0) || isDragged) &&
              !disabled;
          return (
            <Thumb
              {...props}
              onMouseEnter={() => {
                if (index === 0) {
                  setIsHovered0(true);
                } else {
                  setIsHovered1(true);
                }
              }}
              onMouseLeave={() => {
                if (index === 0) {
                  setIsHovered0(false);
                } else {
                  setIsHovered1(false);
                }
              }}
              $thumbIndex={index}
              $isDragged={isDragged}
              style={{
                ...props.style,
              }}
              {...sharedProps}
              {...thumbProps}
              $isFocusVisible={isFocusVisible && focusedThumbIndex === index}
            >
              {displayLabel && (
                <ThumbValue
                  $thumbIndex={index}
                  $isDragged={isDragged}
                  {...sharedProps}
                  {...thumbValueProps}
                >
                  {valueToLabel(value[index])}
                </ThumbValue>
              )}
              {displayLabel && (
                <InnerThumb
                  $thumbIndex={index}
                  $isDragged={isDragged}
                  {...sharedProps}
                  {...innerThumbProps}
                />
              )}
            </Thumb>
          );
        }}
        {...(marks
          ? {
              renderMark: ({ props, index }) => {
                return (
                  <Mark $markIndex={index} {...props} {...sharedProps} {...markProps} />
                );
              },
            }
          : {})}
      />
      <TickBar {...sharedProps} {...tickBarProps}>
        <Tick {...sharedProps} {...tickProps}>
          {valueToLabel(min)}
        </Tick>
        <Tick {...sharedProps} {...tickProps}>
          {valueToLabel(max)}
        </Tick>
      </TickBar>
    </Root>
  );
}
export default Slider;
