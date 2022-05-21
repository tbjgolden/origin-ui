import * as React from "react";
import { StyledRoot, StyledEmoticon } from "./styled-components";
import { getOverrides } from "../helpers/overrides";
import { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } from "./utils";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
class EmoticonRating extends React.Component {
  constructor() {
    super(...arguments);
    this.state = { isFocusVisible: false, previewIndex: void 0 };
    this.selectItem = (value) => {
      const { onChange } = this.props;
      onChange && onChange({ value });
      this.setState({ previewIndex: void 0 });
    };
    this.updatePreview = (previewIndex) => {
      this.setState({ previewIndex });
    };
    this.handleFocus = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisible: true });
      }
    };
    this.handleBlur = (event) => {
      if (this.state.isFocusVisible !== false) {
        this.setState({ isFocusVisible: false });
      }
    };
    this.renderRatingContents = () => {
      const { overrides = {}, value = -1, size = 44, readOnly = false } = this.props;
      const { previewIndex } = this.state;
      const [Emoticon, emoticonProps] = getOverrides(overrides.Item, StyledEmoticon);
      const ratings = [];
      const refs = [{ current: null }];
      for (let x = 1; x <= 5; x++) {
        const isFocusable = x === value || value < 1 && x === 1;
        const starRef = React.createRef();
        refs.push(starRef);
        ratings.push(<Emoticon key={x} role="radio" ref={starRef} tabIndex={isFocusable ? "0" : "-1"} aria-setsize={5} aria-checked={x === value} aria-posinset={x} aria-disabled={readOnly} $size={size} $index={x} $isActive={previewIndex !== void 0 ? x === previewIndex : x === value} $isSelected={x === previewIndex} $isFocusVisible={this.state.isFocusVisible && isFocusable} $isReadOnly={readOnly} onClick={() => {
          if (readOnly) {
            return;
          }
          this.selectItem(x);
        }} onKeyDown={(e) => {
          if (readOnly) {
            return;
          }
          if (e.keyCode === ARROW_UP || e.keyCode === ARROW_LEFT) {
            e.preventDefault && e.preventDefault();
            const prevIndex = value - 1 < 1 ? 5 : value - 1;
            this.selectItem(prevIndex);
            refs[prevIndex].current && refs[prevIndex].current.focus();
          }
          if (e.keyCode === ARROW_DOWN || e.keyCode === ARROW_RIGHT) {
            e.preventDefault && e.preventDefault();
            const nextIndex = value + 1 > 5 ? 1 : value + 1;
            this.selectItem(nextIndex);
            refs[nextIndex].current && refs[nextIndex].current.focus();
          }
        }} onMouseOver={() => {
          if (readOnly) {
            return;
          }
          this.updatePreview(x);
        }} onFocus={forkFocus(emoticonProps, this.handleFocus)} onBlur={forkBlur(emoticonProps, this.handleBlur)} {...emoticonProps} />);
      }
      return ratings;
    };
  }
  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    return <Root data-baseweb="emoticon-rating" role="radiogroup" onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget))
        this.updatePreview(void 0);
    }} onMouseLeave={() => this.updatePreview(void 0)} {...rootProps}>{this.renderRatingContents()}</Root>;
  }
}
EmoticonRating.defaultProps = {
  overrides: {},
  readOnly: false
};
export default EmoticonRating;
