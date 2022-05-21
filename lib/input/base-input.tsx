import * as React from "react";
import { getOverrides } from "../helpers/overrides";
import { ADJOINED, SIZE, CUSTOM_INPUT_TYPE } from "./constants";
import {
  InputContainer as StyledInputContainer,
  Input as StyledInput,
  StyledClearIcon,
  StyledClearIconContainer,
  StyledMaskToggleButton,
} from "./styled-components";
import { getSharedProps } from "./utils";
import Hide from "../icon/hide";
import Show from "../icon/show";
import createEvent from "../utils/create-event";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
const NullComponent = () => {
  return null;
};
const _BaseInput = class extends React.Component {
  constructor() {
    super(...arguments);
    this.inputRef = this.props.inputRef || React.createRef();
    this.state = {
      isFocused: this.props.autoFocus || false,
      isMasked: this.props.type === "password",
      initialType: this.props.type,
      isFocusVisibleForClear: false,
      isFocusVisibleForMaskToggle: false,
    };
    this.onInputKeyDown = (e) => {
      if (this.props.clearOnEscape && e.key === "Escape" && this.inputRef.current) {
        this.clearValue();
        e.stopPropagation();
      }
    };
    this.onClearIconClick = () => {
      if (this.inputRef.current) this.clearValue();
      if (this.inputRef.current) this.inputRef.current.focus();
    };
    this.onFocus = (e) => {
      this.setState({ isFocused: true });
      this.props.onFocus(e);
    };
    this.onBlur = (e) => {
      this.setState({ isFocused: false });
      this.props.onBlur(e);
    };
    this.handleFocusForMaskToggle = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisibleForMaskToggle: true });
      }
    };
    this.handleBlurForMaskToggle = (event) => {
      if (this.state.isFocusVisibleForMaskToggle !== false) {
        this.setState({ isFocusVisibleForMaskToggle: false });
      }
    };
    this.handleFocusForClear = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisibleForClear: true });
      }
    };
    this.handleBlurForClear = (event) => {
      if (this.state.isFocusVisibleForClear !== false) {
        this.setState({ isFocusVisibleForClear: false });
      }
    };
  }
  componentDidMount() {
    const { autoFocus, clearable } = this.props;
    if (this.inputRef.current) {
      if (autoFocus) {
        this.inputRef.current.focus();
      }
      if (clearable) {
        this.inputRef.current.addEventListener("keydown", this.onInputKeyDown);
      }
    }
  }
  componentWillUnmount() {
    const { clearable } = this.props;
    if (clearable && this.inputRef.current) {
      this.inputRef.current.removeEventListener("keydown", this.onInputKeyDown);
    }
  }
  clearValue() {
    const input = this.inputRef.current;
    if (input) {
      const nativeInputValue = Object.getOwnPropertyDescriptor(
        this.props.type === CUSTOM_INPUT_TYPE.textarea
          ? window.HTMLTextAreaElement.prototype
          : window.HTMLInputElement.prototype,
        "value"
      );
      if (nativeInputValue) {
        const nativeInputValueSetter = nativeInputValue.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(input, "");
          const event = createEvent("input");
          input.dispatchEvent(event);
        }
      }
    }
  }
  getInputType() {
    if (this.props.type === "password") {
      return this.state.isMasked ? "password" : "text";
    } else {
      return this.props.type;
    }
  }
  renderMaskToggle() {
    if (this.props.type !== "password") return null;
    const [MaskToggleButton, maskToggleButtonProps] = getOverrides(
      this.props.overrides.MaskToggleButton,
      StyledMaskToggleButton
    );
    const [MaskToggleShowIcon, maskToggleIconShowProps] = getOverrides(
      this.props.overrides.MaskToggleShowIcon,
      Show
    );
    const [MaskToggleHideIcon, maskToggleIconHideProps] = getOverrides(
      this.props.overrides.MaskToggleHideIcon,
      Hide
    );
    const label = this.state.isMasked ? "Show password text" : "Hide password text";
    const iconSize = {
      [SIZE.mini]: "12px",
      [SIZE.compact]: "16px",
      [SIZE.default]: "20px",
      [SIZE.large]: "24px",
    }[this.props.size];
    return (
      <MaskToggleButton
        $size={this.props.size}
        $isFocusVisible={this.state.isFocusVisibleForMaskToggle}
        aria-label={label}
        onClick={() => {
          return this.setState((state) => {
            return { isMasked: !state.isMasked };
          });
        }}
        title={label}
        type="button"
        {...maskToggleButtonProps}
        onFocus={forkFocus(maskToggleButtonProps, this.handleFocusForMaskToggle)}
        onBlur={forkBlur(maskToggleButtonProps, this.handleBlurForMaskToggle)}
      >
        {this.state.isMasked ? (
          <MaskToggleShowIcon
            size={iconSize}
            title={label}
            {...maskToggleIconShowProps}
          />
        ) : (
          <MaskToggleHideIcon
            size={iconSize}
            title={label}
            {...maskToggleIconHideProps}
          />
        )}
      </MaskToggleButton>
    );
  }
  renderClear() {
    const { clearable, value, disabled, overrides = {} } = this.props;
    if (
      disabled ||
      !clearable ||
      value == null ||
      (typeof value === "string" && value.length === 0)
    ) {
      return null;
    }
    const [ClearIconContainer, clearIconContainerProps] = getOverrides(
      overrides.ClearIconContainer,
      StyledClearIconContainer
    );
    const [ClearIcon, clearIconProps] = getOverrides(
      overrides.ClearIcon,
      StyledClearIcon
    );
    const ariaLabel = "Clear value";
    const sharedProps = getSharedProps(this.props, this.state);
    const iconSize = {
      [SIZE.mini]: "14px",
      [SIZE.compact]: "14px",
      [SIZE.default]: "16px",
      [SIZE.large]: "22px",
    }[this.props.size];
    return (
      <ClearIconContainer
        $alignTop={this.props.type === CUSTOM_INPUT_TYPE.textarea}
        {...sharedProps}
        {...clearIconContainerProps}
      >
        <ClearIcon
          size={iconSize}
          tabIndex={0}
          title={ariaLabel}
          aria-label={ariaLabel}
          onClick={this.onClearIconClick}
          onKeyDown={(event) => {
            if (event.key && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              this.onClearIconClick();
            }
          }}
          role="button"
          $isFocusVisible={this.state.isFocusVisibleForClear}
          {...sharedProps}
          {...clearIconProps}
          onFocus={forkFocus(clearIconProps, this.handleFocusForClear)}
          onBlur={forkBlur(clearIconProps, this.handleBlurForClear)}
        />
      </ClearIconContainer>
    );
  }
  render() {
    const {
      value,
      type,
      overrides: {
        InputContainer: InputContainerOverride,
        Input: InputOverride,
        Before: BeforeOverride,
        After: AfterOverride,
      },
    } = this.props;
    const autoComplete =
      this.state.initialType === "password" &&
      this.props.autoComplete === _BaseInput.defaultProps.autoComplete
        ? "new-password"
        : this.props.autoComplete;
    const sharedProps = getSharedProps(this.props, this.state);
    const [InputContainer, inputContainerProps] = getOverrides(
      InputContainerOverride,
      StyledInputContainer
    );
    const [Input, inputProps] = getOverrides(InputOverride, StyledInput);
    const [Before, beforeProps] = getOverrides(BeforeOverride, NullComponent);
    const [After, afterProps] = getOverrides(AfterOverride, NullComponent);
    return (
      <InputContainer
        data-baseweb={this.props["data-baseweb"] || "base-input"}
        {...sharedProps}
        {...inputContainerProps}
      >
        <Before {...sharedProps} {...beforeProps} />
        <Input
          ref={this.inputRef}
          aria-activedescendant={this.props["aria-activedescendant"]}
          aria-autocomplete={this.props["aria-autocomplete"]}
          aria-controls={this.props["aria-controls"]}
          aria-errormessage={this.props["aria-errormessage"]}
          aria-haspopup={this.props["aria-haspopup"]}
          aria-label={this.props["aria-label"]}
          aria-labelledby={this.props["aria-labelledby"]}
          aria-describedby={this.props["aria-describedby"]}
          aria-invalid={this.props.error}
          aria-required={this.props.required}
          autoComplete={autoComplete}
          disabled={this.props.disabled}
          id={this.props.id}
          inputMode={this.props.inputMode}
          maxLength={this.props.maxLength}
          name={this.props.name}
          onBlur={this.onBlur}
          onChange={this.props.onChange}
          onFocus={this.onFocus}
          onKeyDown={this.props.onKeyDown}
          onKeyPress={this.props.onKeyPress}
          onKeyUp={this.props.onKeyUp}
          pattern={this.props.pattern}
          placeholder={this.props.placeholder}
          type={this.getInputType()}
          required={this.props.required}
          role={this.props.role}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          rows={this.props.type === CUSTOM_INPUT_TYPE.textarea ? this.props.rows : null}
          {...sharedProps}
          {...inputProps}
        >
          {type === CUSTOM_INPUT_TYPE.textarea ? value : null}
        </Input>
        {this.renderClear()}
        {this.renderMaskToggle()}
        <After {...sharedProps} {...afterProps} />
      </InputContainer>
    );
  }
};
const BaseInput = _BaseInput;
BaseInput.defaultProps = {
  "aria-activedescendant": null,
  "aria-autocomplete": null,
  "aria-controls": null,
  "aria-errormessage": null,
  "aria-haspopup": null,
  "aria-label": null,
  "aria-labelledby": null,
  "aria-describedby": null,
  adjoined: ADJOINED.none,
  autoComplete: "on",
  autoFocus: false,
  disabled: false,
  error: false,
  positive: false,
  name: "",
  inputMode: "text",
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
  onKeyPress: () => {},
  onKeyUp: () => {},
  onFocus: () => {},
  onClear: () => {},
  clearable: false,
  clearOnEscape: true,
  overrides: {},
  pattern: null,
  placeholder: "",
  required: false,
  role: null,
  size: SIZE.default,
  type: "text",
};
export default BaseInput;
