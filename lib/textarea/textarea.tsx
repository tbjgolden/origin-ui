import React from "react";
import { mergeOverrides, getOverrides } from "../helpers/overrides";
import { BaseInput, SIZE, CUSTOM_INPUT_TYPE } from "../input";
import {
  StyledTextAreaRoot,
  StyledTextarea,
  StyledTextareaContainer,
} from "./styled-components";
class Textarea extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isFocused: this.props.autoFocus || false,
    };
    this.onFocus = (e) => {
      this.setState({ isFocused: true });
      this.props.onFocus(e);
    };
    this.onBlur = (e) => {
      this.setState({ isFocused: false });
      this.props.onBlur(e);
    };
  }
  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledTextAreaRoot);
    const inputOverrides = mergeOverrides(
      {
        Input: { component: StyledTextarea },
        InputContainer: { component: StyledTextareaContainer },
      },
      overrides
    );
    return (
      <Root
        data-baseweb="textarea"
        $isFocused={this.state.isFocused}
        $disabled={this.props.disabled}
        $error={this.props.error}
        $positive={this.props.positive}
        $required={this.props.required}
        {...rootProps}
      >
        <BaseInput
          {...this.props}
          type={CUSTOM_INPUT_TYPE.textarea}
          overrides={inputOverrides}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </Root>
    );
  }
}
Textarea.defaultProps = {
  autoFocus: false,
  disabled: false,
  error: false,
  name: "",
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
  onKeyPress: () => {},
  onKeyUp: () => {},
  onFocus: () => {},
  overrides: {},
  placeholder: "",
  required: false,
  rows: 3,
  size: SIZE.default,
};
export default Textarea;
