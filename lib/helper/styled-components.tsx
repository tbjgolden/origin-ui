import { styled } from "../styles";
import { PLACEMENT } from "../popover/constants";
import { getBodyStyles } from "../popover/styled-components";
import { getPopoverMarginStyles, splitPlacement } from "../popover/utils";
const CLAMP_ARROW_SIZE = 16;
function dimensions(placement) {
  switch (placement) {
    case PLACEMENT.left:
    case PLACEMENT.right:
      return [CLAMP_ARROW_SIZE, CLAMP_ARROW_SIZE * 2];
    case PLACEMENT.top:
    case PLACEMENT.bottom:
      return [CLAMP_ARROW_SIZE * 2, CLAMP_ARROW_SIZE];
    default:
      return [CLAMP_ARROW_SIZE, CLAMP_ARROW_SIZE];
  }
}
function linearGradientDirection(placement) {
  return ["to", ...splitPlacement(placement)].join(" ");
}
function conicGradientOrigin(placement) {
  switch (placement) {
    case PLACEMENT.right:
      return [0, 50];
    case PLACEMENT.bottom:
      return [50, 0];
    case PLACEMENT.left:
      return [100, 50];
    case PLACEMENT.top:
      return [50, 100];
    default:
      return [0, 0];
  }
}
function conicGradientDegStart(placement) {
  switch (placement) {
    case PLACEMENT.right:
      return 45;
    case PLACEMENT.bottom:
      return 135;
    case PLACEMENT.left:
      return 225;
    case PLACEMENT.top:
      return 315;
    default:
      return 0;
  }
}
function position(offsets, placement, width, height) {
  switch (placement) {
    case PLACEMENT.top: {
      return {
        bottom: `-${height}px`,
        left: `${offsets.left}px`
      };
    }
    case PLACEMENT.bottom: {
      return {
        top: `-${height}px`,
        left: `${offsets.left}px`
      };
    }
    case PLACEMENT.left: {
      return {
        top: `${offsets.top}px`,
        right: `-${width}px`
      };
    }
    case PLACEMENT.right: {
      return {
        top: `${offsets.top}px`,
        left: `-${width}px`
      };
    }
    case PLACEMENT.topLeft: {
      return {
        bottom: `-${height}px`
      };
    }
    case PLACEMENT.topRight: {
      return {
        bottom: `-${height}px`,
        right: "0px"
      };
    }
    case PLACEMENT.rightTop: {
      return {
        left: `-${width}px`
      };
    }
    case PLACEMENT.rightBottom: {
      return {
        bottom: "0px",
        left: `-${width}px`
      };
    }
    case PLACEMENT.bottomRight: {
      return {
        top: `-${height}px`,
        right: "0px"
      };
    }
    case PLACEMENT.bottomLeft: {
      return {
        top: `-${height}px`
      };
    }
    case PLACEMENT.leftBottom: {
      return {
        right: `-${width}px`,
        bottom: "0px"
      };
    }
    case PLACEMENT.leftTop: {
      return {
        right: `-${width}px`
      };
    }
  }
  return {};
}
function clampArrowStyle(offsets, placement, color) {
  if (placement === PLACEMENT.auto) {
    return {};
  } else if (placement === PLACEMENT.top || placement === PLACEMENT.bottom || placement === PLACEMENT.left || placement === PLACEMENT.right) {
    const [w, h] = dimensions(placement);
    const [x, y] = conicGradientOrigin(placement);
    return {
      position: "absolute",
      width: `${w}px`,
      height: `${h}px`,
      background: `conic-gradient(from ${conicGradientDegStart(placement)}deg at ${x}% ${y}%, ${color} 0%, ${color} 25%, transparent 25%, transparent 100%)`,
      ...position(offsets, placement, w, h)
    };
  } else {
    const [w, h] = dimensions(placement);
    return {
      position: "absolute",
      width: `${w}px`,
      height: `${h}px`,
      background: `linear-gradient(${linearGradientDirection(placement)}, transparent 0%, transparent 50%, ${color} 50%, ${color} 100%)`,
      ...position(offsets, placement, w, h)
    };
  }
}
export const StyledBody = styled("div", (props) => {
  return {
    ...getBodyStyles(props),
    ...getPopoverMarginStyles(props.$showArrow ? CLAMP_ARROW_SIZE : 0, props.$placement, props.$popoverMargin),
    backgroundColor: props.$theme.colors.backgroundPrimary
  };
});
export const StyledArrow = styled("div", (props) => {
  return {
    ...clampArrowStyle(props.$arrowOffset, props.$placement, props.$theme.colors.backgroundPrimary)
  };
});
