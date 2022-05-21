import * as React from "react";
import { getOverrides } from "../helpers/overrides";
import {
  Root as StyledRoot,
  Label as StyledLabel,
  Input as StyledInput,
  RadioMarkInner as StyledRadioMarkInner,
  RadioMarkOuter as StyledRadioMarkOuter,
  Description as StyledDescription
} from "./styled-components";
function isLabelTopLeft(labelPlacement) {
  return labelPlacement === "top" || labelPlacement === "left";
}
function isLabelBottomRight(labelPlacement) {
  return labelPlacement === "bottom" || labelPlacement === "right";
}
const stopPropagation = (e) => {
  return e.stopPropagation();
};
class Radio extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isActive: false,
      isHovered: false
    };
    this.onMouseEnter = (e) => {
      this.setState({ isHovered: true });
      this.props.onMouseEnter && this.props.onMouseEnter(e);
    };
    this.onMouseLeave = (e) => {
      this.setState({ isHovered: false });
      this.props.onMouseLeave && this.props.onMouseLeave(e);
    };
    this.onMouseDown = (e) => {
      this.setState({ isActive: true });
      this.props.onMouseDown && this.props.onMouseDown(e);
    };
    this.onMouseUp = (e) => {
      this.setState({ isActive: false });
      this.props.onMouseUp && this.props.onMouseUp(e);
    };
  }
  componentDidMount() {
    if (this.props.autoFocus && this.props.inputRef?.current) {
      this.props.inputRef.current.focus();
    }
  }
  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Label, labelProps] = getOverrides(overrides.Label, StyledLabel);
    const [Input, inputProps] = getOverrides(overrides.Input, StyledInput);
    const [Description, descriptionProps] = getOverrides(overrides.Description, StyledDescription);
    const [RadioMarkInner, radioMarkInnerProps] = getOverrides(overrides.RadioMarkInner, StyledRadioMarkInner);
    const [RadioMarkOuter, radioMarkOuterProps] = getOverrides(overrides.RadioMarkOuter, StyledRadioMarkOuter);
    const sharedProps = {
      $align: this.props.align,
      $checked: this.props.checked,
      $disabled: this.props.disabled,
      $hasDescription: !!this.props.description,
      $isActive: this.state.isActive,
      $error: this.props.error,
      $isFocused: this.props.isFocused,
      $isFocusVisible: this.props.isFocused && this.props.isFocusVisible,
      $isHovered: this.state.isHovered,
      $labelPlacement: this.props.labelPlacement,
      $required: this.props.required,
      $value: this.props.value
    };
    const label = <Label {...sharedProps} {...labelProps}>{this.props.containsInteractiveElement ? <div onClick={(e) => {
      return e.preventDefault();
    }}>{this.props.children}</div> : this.props.children}</Label>;
    return <React.Fragment>
      <Root data-baseweb="radio" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} {...sharedProps} {...rootProps}>
        {isLabelTopLeft(this.props.labelPlacement) && label}
        <RadioMarkOuter {...sharedProps} {...radioMarkOuterProps}><RadioMarkInner {...sharedProps} {...radioMarkInnerProps} /></RadioMarkOuter>
        <Input aria-invalid={this.props.error || null} checked={this.props.checked} disabled={this.props.disabled} name={this.props.name} onBlur={this.props.onBlur} onFocus={this.props.onFocus} onClick={stopPropagation} onChange={this.props.onChange} ref={this.props.inputRef} required={this.props.required} tabIndex={this.props.tabIndex} type="radio" value={this.props.value} {...sharedProps} {...inputProps} />
        {isLabelBottomRight(this.props.labelPlacement) && label}
      </Root>
      {!!this.props.description && <Description {...sharedProps} {...descriptionProps}>{this.props.description}</Description>}
    </React.Fragment>;
  }
}
Radio.defaultProps = {
  overrides: {},
  containsInteractiveElement: false,
  checked: false,
  disabled: false,
  autoFocus: false,
  inputRef: React.createRef(),
  align: "vertical",
  error: false,
  onChange: () => {
  },
  onMouseEnter: () => {
  },
  onMouseLeave: () => {
  },
  onMouseDown: () => {
  },
  onMouseUp: () => {
  },
  onFocus: () => {
  },
  onBlur: () => {
  }
};
export default Radio;
