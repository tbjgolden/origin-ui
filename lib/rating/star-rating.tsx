import React from "react";
import { StyledRoot, StyledStar } from "./styled-components";
import { getOverrides } from "../helpers/overrides";
import { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } from "./utils";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
class StarRating extends React.Component {
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
      const {
        overrides = {},
        value = -1,
        numItems,
        size = 22,
        readOnly = false,
      } = this.props;
      const { previewIndex } = this.state;
      const [Star, starProps] = getOverrides(overrides.Item, StyledStar);
      const ratings = [];
      const refs = [{ current: null }];
      for (let x = 1; x <= numItems; x++) {
        const isFocusable = x === value || (value < 1 && x === 1);
        const starRef = React.createRef();
        refs.push(starRef);
        ratings.push(
          <Star
            key={x}
            role="radio"
            title="rating"
            ref={starRef}
            tabIndex={isFocusable ? "0" : "-1"}
            aria-setsize={numItems}
            aria-checked={x <= value}
            aria-posinset={x}
            aria-disabled={readOnly}
            $size={size}
            $index={x}
            $isActive={previewIndex !== void 0 ? x <= previewIndex : x <= value}
            $isPartialActive={previewIndex !== void 0 ? false : x <= value + 0.5}
            $isSelected={x === previewIndex}
            $isFocusVisible={this.state.isFocusVisible && isFocusable}
            $isReadOnly={readOnly}
            onClick={() => {
              if (readOnly) {
                return;
              }
              this.selectItem(x);
            }}
            onKeyDown={(e) => {
              if (readOnly) {
                return;
              }
              if (e.keyCode === ARROW_UP || e.keyCode === ARROW_LEFT) {
                e.preventDefault && e.preventDefault();
                const prevIndex = value - 1 < 1 ? numItems : value - 1;
                this.selectItem(prevIndex);
                refs[prevIndex].current && refs[prevIndex].current.focus();
              }
              if (e.keyCode === ARROW_DOWN || e.keyCode === ARROW_RIGHT) {
                e.preventDefault && e.preventDefault();
                const nextIndex = value + 1 > numItems ? 1 : value + 1;
                this.selectItem(nextIndex);
                refs[nextIndex].current && refs[nextIndex].current.focus();
              }
            }}
            onMouseOver={() => {
              if (readOnly) {
                return;
              }
              this.updatePreview(x);
            }}
            {...starProps}
            onFocus={forkFocus(starProps, this.handleFocus)}
            onBlur={forkBlur(starProps, this.handleBlur)}
          />
        );
      }
      return ratings;
    };
  }
  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    return (
      <Root
        data-baseweb="star-rating"
        role="radiogroup"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) this.updatePreview(void 0);
        }}
        onMouseLeave={() => {
          return this.updatePreview(void 0);
        }}
        {...rootProps}
      >
        {this.renderRatingContents()}
      </Root>
    );
  }
}
StarRating.defaultProps = {
  overrides: {},
  numItems: 5,
  readOnly: false,
};
export default StarRating;
