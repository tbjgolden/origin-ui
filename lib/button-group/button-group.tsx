import * as React from "react";
import { KIND, SIZE, SHAPE } from "../button";
import { MODE } from "./constants";
import { getOverrides } from "../helpers/overrides";
import { LocaleContext } from "../locale";
import { StyledRoot } from "./styled-components";
function isIndexSelected(selected, index) {
  if (!Array.isArray(selected) && typeof selected !== "number") {
    return false;
  }
  if (Array.isArray(selected)) {
    return selected.includes(index);
  }
  return selected === index;
}
export default class ButtonGroup extends React.Component {
  constructor() {
    super(...arguments);
    this.childRefs = {};
  }
  render() {
    const {
      overrides = {},
      mode = MODE.checkbox,
      children,
      selected,
      disabled,
      onClick,
      kind,
      shape,
      size
    } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const ariaLabel = this.props["aria-label"] || this.props.ariaLabel;
    const isRadio = mode === MODE.radio;
    const numItems = React.Children.count(children);
    return <LocaleContext.Consumer>{(locale) => {
      return <Root aria-label={ariaLabel || locale.buttongroup.ariaLabel} data-baseweb="button-group" role={isRadio ? "radiogroup" : "group"} $shape={shape} $length={children.length} {...rootProps}>{React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const isSelected = child.props.isSelected ? child.props.isSelected : isIndexSelected(selected, index);
        if (isRadio) {
          this.childRefs[index] = React.createRef();
        }
        return React.cloneElement(child, {
          disabled: disabled || child.props.disabled,
          isSelected,
          ref: isRadio ? this.childRefs[index] : void 0,
          tabIndex: !isRadio || isSelected || isRadio && (!selected || selected === -1) && index === 0 ? 0 : -1,
          onKeyDown: (e) => {
            if (!isRadio)
              return;
            const value = Number(selected) ? Number(selected) : 0;
            if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
              e.preventDefault && e.preventDefault();
              const prevIndex = value - 1 < 0 ? numItems - 1 : value - 1;
              onClick && onClick(e, prevIndex);
              this.childRefs[prevIndex].current && this.childRefs[prevIndex].current.focus();
            }
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
              e.preventDefault && e.preventDefault();
              const nextIndex = value + 1 > numItems - 1 ? 0 : value + 1;
              onClick && onClick(e, nextIndex);
              this.childRefs[nextIndex].current && this.childRefs[nextIndex].current.focus();
            }
          },
          kind,
          onClick: (event) => {
            if (disabled) {
              return;
            }
            if (child.props.onClick) {
              child.props.onClick(event);
            }
            if (onClick) {
              onClick(event, index);
            }
          },
          shape,
          size,
          overrides: {
            BaseButton: {
              style: ({ $theme }) => {
                if (children.length === 1) {
                  return {};
                }
                if (shape !== SHAPE.default) {
                  return {
                    marginLeft: $theme.sizing.scale100,
                    marginRight: $theme.sizing.scale100
                  };
                }
                return {
                  marginLeft: "0.5px",
                  marginRight: "0.5px"
                };
              },
              props: {
                "aria-checked": isSelected,
                role: isRadio ? "radio" : "checkbox"
              }
            },
            ...child.props.overrides
          }
        });
      })}</Root>;
    }}</LocaleContext.Consumer>;
  }
}
ButtonGroup.defaultProps = {
  disabled: false,
  onClick: () => {
  },
  shape: SHAPE.default,
  size: SIZE.default,
  kind: KIND.secondary
};
