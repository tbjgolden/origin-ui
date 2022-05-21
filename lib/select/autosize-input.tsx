import React from "react";
import { StyledInput, StyledInputSizer } from "./styled-components";
import { getOverrides } from "../helpers/overrides";
export default class AutosizeInput extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      inputWidth: 5,
    };
    this.sizerRef = (el) => {
      this.sizer = el;
    };
  }
  componentDidMount() {
    this.mounted = true;
    this.updateInputWidth();
  }
  componentDidUpdate(prevProps, prevState) {
    this.updateInputWidth();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  updateInputWidth() {
    if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === "undefined") {
      return;
    }
    const newInputWidth = this.sizer.scrollWidth + 2;
    if (
      newInputWidth !== this.state.inputWidth &&
      this.sizer.scrollWidth !== this.state.inputWidth
    ) {
      this.setState({ inputWidth: newInputWidth });
    }
  }
  render() {
    const { overrides = {}, inputRef, ...restProps } = this.props;
    const [Input, inputProps] = getOverrides(overrides.Input, StyledInput);
    const sizerValue = [this.props.defaultValue, this.props.value, ""].reduce(
      (previousValue, currentValue) => {
        if (previousValue !== null && previousValue !== void 0) {
          return previousValue;
        }
        return currentValue;
      }
    );
    const componentInputProps = {
      ...restProps,
      $width: `${this.state.inputWidth}px`,
    };
    return (
      <React.Fragment>
        <Input {...componentInputProps} ref={inputRef} {...inputProps} />
        <StyledInputSizer
          $size={this.props.$size}
          ref={this.sizerRef}
          $style={inputProps.$style ? inputProps.$style : null}
        >
          {sizerValue}
        </StyledInputSizer>
      </React.Fragment>
    );
  }
}
AutosizeInput.defaultProps = {
  inputRef: React.createRef(),
  value: "",
  overrides: {},
};
