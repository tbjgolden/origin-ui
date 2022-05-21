import React from "react";
import Popper from "popper";
import { toPopperPlacement, parsePopperOffset } from "./utils";
import { TETHER_PLACEMENT } from "./constants";
class Tether extends React.Component {
  constructor() {
    super(...arguments);
    this.popperHeight = 0;
    this.popperWidth = 0;
    this.anchorHeight = 0;
    this.anchorWidth = 0;
    this.state = {
      isMounted: false,
    };
    this.onPopperUpdate = (data) => {
      const normalizedOffsets = {
        popper: parsePopperOffset(data.offsets.popper),
        arrow: data.offsets.arrow
          ? parsePopperOffset(data.offsets.arrow)
          : { top: 0, left: 0 },
      };
      this.props.onPopperUpdate(normalizedOffsets, data);
    };
  }
  componentDidMount() {
    this.setState({ isMounted: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.anchorRef) {
      const { height, width } = this.props.anchorRef.getBoundingClientRect();
      if (this.anchorHeight !== height || this.anchorWidth !== width) {
        this.anchorHeight = height;
        this.anchorWidth = width;
        this.popper && this.popper.scheduleUpdate();
      }
    }
    if (this.props.popperRef) {
      const { height, width } = this.props.popperRef.getBoundingClientRect();
      if (this.popperHeight !== height || this.popperWidth !== width) {
        this.popperHeight = height;
        this.popperWidth = width;
        this.popper && this.popper.scheduleUpdate();
      }
      if (this.state.isMounted !== prevState.isMounted) {
        if (!this.props.anchorRef) {
          if (__DEV__) {
            console.warn(`[baseui][TetherBehavior] ref has not been passed to the Popper's anchor element.
              See how to pass the ref to an anchor element in the Popover example
              http://baseui.design/components/popover#anchor-ref-handling-example`);
          }
        } else {
          this.initializePopper();
        }
      }
    }
  }
  componentWillUnmount() {
    this.destroyPopover();
  }
  initializePopper() {
    const { placement, popperOptions } = this.props;
    const { modifiers, ...restOptions } = popperOptions;
    if (!this.props.anchorRef || !this.props.popperRef) return;
    this.popper = new Popper(this.props.anchorRef, this.props.popperRef, {
      placement: toPopperPlacement(placement),
      modifiers: {
        arrow: {
          element: this.props.arrowRef,
          enabled: !!this.props.arrowRef,
        },
        computeStyle: {
          gpuAcceleration: false,
        },
        applyStyle: {
          enabled: false,
        },
        applyReactStyle: {
          enabled: true,
          fn: this.onPopperUpdate,
          order: 900,
        },
        preventOverflow: { enabled: true },
        ...modifiers,
      },
      ...restOptions,
    });
  }
  destroyPopover() {
    if (this.popper) {
      this.popper.destroy();
      delete this.popper;
    }
  }
  render() {
    return this.props.children || null;
  }
}
Tether.defaultProps = {
  anchorRef: null,
  onPopperUpdate: () => {
    return null;
  },
  placement: TETHER_PLACEMENT.auto,
  popperRef: null,
  popperOptions: {},
};
export default Tether;
