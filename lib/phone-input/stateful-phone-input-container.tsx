import React from "react";
import { COUNTRIES, STATE_CHANGE_TYPE } from "./constants";
import defaultProps from "./default-props";
const defaultStateReducer = (type, nextState) => {
  return nextState;
};
export default class StatefulPhoneInputContainer extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { text: "", country: COUNTRIES.US, ...this.props.initialState };
    this.internalSetState = (type, nextState) => {
      this.setState(this.props.stateReducer(type, nextState, this.state));
    };
    this.onTextChange = (event) => {
      this.props.onTextChange(event);
      this.internalSetState(STATE_CHANGE_TYPE.textChange, {
        text: event.target.value
      });
    };
    this.onCountryChange = (event) => {
      this.props.onCountryChange(event);
      if (event.option && event.option.id) {
        this.internalSetState(STATE_CHANGE_TYPE.countryChange, {
          country: COUNTRIES[event.option.id]
        });
      }
    };
  }
  render() {
    return this.props.children({
      ...defaultProps,
      "aria-label": this.props["aria-label"],
      "aria-labelledby": this.props["aria-labelledby"],
      "aria-describedby": this.props["aria-describedby"],
      disabled: this.props.disabled,
      error: this.props.error,
      id: this.props.id,
      maxDropdownHeight: this.props.maxDropdownHeight,
      maxDropdownWidth: this.props.maxDropdownWidth,
      mapIsoToLabel: this.props.mapIsoToLabel,
      name: this.props.name,
      overrides: this.props.overrides,
      placeholder: this.props.placeholder,
      positive: this.props.positive,
      required: this.props.required,
      size: this.props.size,
      clearable: this.props.clearable,
      country: this.state.country,
      text: this.state.text,
      onTextChange: this.onTextChange,
      onCountryChange: this.onCountryChange
    });
  }
}
StatefulPhoneInputContainer.defaultProps = {
  initialState: {
    text: defaultProps.text,
    country: defaultProps.country
  },
  onTextChange: defaultProps.onTextChange,
  onCountryChange: defaultProps.onTextChange,
  stateReducer: defaultStateReducer,
  overrides: {}
};
