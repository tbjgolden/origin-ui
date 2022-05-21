import React from "react";
import MultiRef from "react-multi-ref";
import defaultProps from "./default-props";
import {
  StyledRoot,
  StyledInputOverrideRoot,
  StyledInputOverrideInput,
} from "./styled-components";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import { Input as DefaultInput } from "../input";
export default class PinCode extends React.Component {
  constructor() {
    super(...arguments);
    this._inputRefs = new MultiRef();
    this.state = {
      hasFocus: false,
    };
  }
  componentDidMount() {
    if (this.props.autoFocus) {
      const inputRef = this._inputRefs.map.get(0);
      if (inputRef && inputRef.focus) inputRef.focus();
    }
  }
  getMaskStyle(i) {
    return this.props.values[i] !== "" && typeof this.props.mask === "string"
      ? this.props.mask
      : this.props.values[i];
  }
  render() {
    const [Root, rootProps] = getOverrides(this.props.overrides.Root, StyledRoot);
    const [Input, inputProps] = getOverrides(this.props.overrides.Input, DefaultInput);
    const baseOverrides = {
      Root: { component: StyledInputOverrideRoot },
      Input: {
        component: StyledInputOverrideInput,
        props: {
          type:
            typeof this.props.mask === "boolean" && this.props.mask ? "password" : "text",
        },
      },
    };
    inputProps.overrides = mergeOverrides(baseOverrides, inputProps.overrides);
    return (
      <Root data-baseweb="pin-code" {...rootProps}>
        {this.props.values.map((v, i) => {
          return (
            <Input
              aria-label={this.props["aria-label"]}
              aria-labelledby={this.props["aria-labelledby"]}
              aria-describedby={this.props["aria-describedby"]}
              autoComplete={this.props.autoComplete}
              disabled={this.props.disabled}
              error={this.props.error}
              id={this.props.id ? this.props.id + "-" + i : null}
              inputMode="numeric"
              inputRef={this._inputRefs.ref(i)}
              key={i}
              name={this.props.name}
              onBlur={() => {
                return this.setState({ hasFocus: false });
              }}
              onFocus={() => {
                return this.setState({ hasFocus: true });
              }}
              onChange={(event) => {
                const eventValue = event.target.value;
                if (eventValue.length > 2) {
                  if (
                    eventValue.length === this.props.values.length &&
                    /^\d+$/.test(eventValue)
                  ) {
                    this.props.onChange({ values: eventValue.split(""), event });
                  }
                  return;
                }
                if (eventValue === "") {
                  const newValues = [...this.props.values];
                  newValues[i] = "";
                  this.props.onChange({ values: newValues, event });
                  return;
                }
                const currentValue = this.props.values[i];
                let newValue = eventValue;
                if (currentValue[0] === eventValue[0]) {
                  newValue = eventValue[1];
                } else if (currentValue[0] === eventValue[1]) {
                  newValue = eventValue[0];
                }
                if (/^\d$/.test(newValue)) {
                  const newValues = [...this.props.values];
                  newValues[i] = newValue;
                  this.props.onChange({ values: newValues, event });
                  if (this.props.manageFocus && i < this.props.values.length - 1) {
                    const inputRef = this._inputRefs.map.get(i + 1);
                    if (inputRef && inputRef.focus) inputRef.focus();
                  }
                }
              }}
              onKeyDown={(event) => {
                if (
                  this.props.manageFocus &&
                  event.key === "Backspace" &&
                  this.props.values[i] === "" &&
                  i > 0
                ) {
                  const inputRef = this._inputRefs.map.get(i - 1);
                  if (inputRef && inputRef.focus) inputRef.focus();
                }
              }}
              pattern="\d*"
              placeholder={this.state.hasFocus ? "" : this.props.placeholder}
              positive={this.props.positive}
              required={this.props.required}
              size={this.props.size}
              value={this.getMaskStyle(i)}
              {...inputProps}
            />
          );
        })}
      </Root>
    );
  }
}
PinCode.defaultProps = defaultProps;
