import React from "react";
import { getOverride, getOverrideProps } from "../helpers/overrides";
import {
  Checkmark as StyledCheckmark,
  Input as StyledInput,
  Label as StyledLabel,
  Root as StyledRoot,
  Toggle as StyledToggle,
  ToggleTrack as StyledToggleTrack,
} from "./styled-components";
import { STYLE_TYPE } from "./constants";
import { isFocusVisible } from "../utils/focusVisible";
const stopPropagation = (event) => {
  return event.stopPropagation();
};
class StatelessCheckbox extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isFocused: this.props.autoFocus || false,
      isFocusVisible: false,
      isHovered: false,
      isActive: false,
    };
    this.onMouseEnter = (e) => {
      this.setState({ isHovered: true });
      this.props.onMouseEnter(e);
    };
    this.onMouseLeave = (e) => {
      this.setState({ isHovered: false, isActive: false });
      this.props.onMouseLeave(e);
    };
    this.onMouseDown = (e) => {
      this.setState({ isActive: true });
      this.props.onMouseDown(e);
    };
    this.onMouseUp = (e) => {
      this.setState({ isActive: false });
      this.props.onMouseUp(e);
    };
    this.onFocus = (e) => {
      this.setState({ isFocused: true });
      this.props.onFocus(e);
      if (isFocusVisible(e)) {
        this.setState({ isFocusVisible: true });
      }
    };
    this.onBlur = (e) => {
      this.setState({ isFocused: false });
      this.props.onBlur(e);
      if (this.state.isFocusVisible !== false) {
        this.setState({ isFocusVisible: false });
      }
    };
  }
  componentDidMount() {
    const { autoFocus, inputRef } = this.props;
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }
  render() {
    const {
      overrides = {},
      onChange,
      labelPlacement = this.props.checkmarkType === STYLE_TYPE.toggle ? "left" : "right",
      inputRef,
      isIndeterminate,
      error,
      disabled,
      value,
      name,
      type,
      checked,
      children,
      required,
      title,
    } = this.props;
    const {
      Root: RootOverride,
      Checkmark: CheckmarkOverride,
      Label: LabelOverride,
      Input: InputOverride,
      Toggle: ToggleOverride,
      ToggleTrack: ToggleTrackOverride,
    } = overrides;
    const Root = getOverride(RootOverride) || StyledRoot;
    const Checkmark = getOverride(CheckmarkOverride) || StyledCheckmark;
    const Label = getOverride(LabelOverride) || StyledLabel;
    const Input = getOverride(InputOverride) || StyledInput;
    const Toggle = getOverride(ToggleOverride) || StyledToggle;
    const ToggleTrack = getOverride(ToggleTrackOverride) || StyledToggleTrack;
    const inputEvents = {
      onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };
    const mouseEvents = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
    };
    const sharedProps = {
      $isFocused: this.state.isFocused,
      $isFocusVisible: this.state.isFocusVisible,
      $isHovered: this.state.isHovered,
      $isActive: this.state.isActive,
      $error: error,
      $checked: checked,
      $isIndeterminate: isIndeterminate,
      $required: required,
      $disabled: disabled,
      $value: value,
    };
    const labelComp = children && (
      <Label
        $labelPlacement={labelPlacement}
        {...sharedProps}
        {...getOverrideProps(LabelOverride)}
      >
        {this.props.containsInteractiveElement ? (
          <div
            onClick={(e) => {
              return e.preventDefault();
            }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </Label>
    );
    return (
      <Root
        data-baseweb="checkbox"
        title={title || null}
        $labelPlacement={labelPlacement}
        {...sharedProps}
        {...mouseEvents}
        {...getOverrideProps(RootOverride)}
      >
        {(labelPlacement === "top" || labelPlacement === "left") && labelComp}
        {this.props.checkmarkType === STYLE_TYPE.toggle ? (
          <ToggleTrack {...sharedProps} {...getOverrideProps(ToggleTrackOverride)}>
            <Toggle {...sharedProps} {...getOverrideProps(ToggleOverride)} />
          </ToggleTrack>
        ) : (
          <Checkmark {...sharedProps} {...getOverrideProps(CheckmarkOverride)} />
        )}
        <Input
          value={value}
          name={name}
          checked={checked}
          required={required}
          aria-label={this.props["aria-label"] || this.props.ariaLabel}
          aria-checked={isIndeterminate ? "mixed" : checked}
          aria-describedby={this.props["aria-describedby"]}
          aria-errormessage={this.props["aria-errormessage"]}
          aria-invalid={error || null}
          aria-required={required || null}
          disabled={disabled}
          type={type}
          ref={inputRef}
          onClick={stopPropagation}
          {...sharedProps}
          {...inputEvents}
          {...getOverrideProps(InputOverride)}
        />
        {(labelPlacement === "bottom" || labelPlacement === "right") && labelComp}
      </Root>
    );
  }
}
StatelessCheckbox.defaultProps = {
  overrides: {},
  checked: false,
  containsInteractiveElement: false,
  disabled: false,
  autoFocus: false,
  isIndeterminate: false,
  inputRef: React.createRef(),
  error: false,
  type: "checkbox",
  checkmarkType: STYLE_TYPE.default,
  onChange: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onFocus: () => {},
  onBlur: () => {},
};
export default StatelessCheckbox;
