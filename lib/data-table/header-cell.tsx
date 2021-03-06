import React from "react";
import { Checkbox } from "../checkbox";
import { useStyletron } from "../styles";
import ChevronDown from "../icon/chevron-down";
import ChevronUp from "../icon/chevron-up";
import { SORT_DIRECTIONS } from "./constants";
import { isFocusVisible } from "../utils/focusVisible";
const HeaderCell = React.forwardRef((props, ref) => {
  const [css, theme] = useStyletron();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const checkboxRef = React.useRef(null);
  const handleFocus = (event) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  };
  const handleBlur = (event) => {
    if (focusVisible !== false) {
      setFocusVisible(false);
    }
  };
  const backgroundColor = props.isHovered
    ? theme.colors.backgroundSecondary
    : theme.colors.backgroundPrimary;
  return (
    <div
      ref={ref}
      role="button"
      tabIndex="0"
      className={css({
        ...theme.typography.font350,
        alignItems: "center",
        backgroundColor,
        boxSizing: "border-box",
        color: theme.colors.contentPrimary,
        cursor: props.sortable ? "pointer" : null,
        display: props.isMeasured ? "inline-flex" : "flex",
        flexGrow: 1,
        height: "100%",
        paddingLeft: theme.sizing.scale500,
        paddingRight: theme.sizing.scale500,
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        outline: focusVisible ? `3px solid ${theme.colors.accent}` : "none",
        outlineOffset: "-3px",
      })}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          props.onSort(props.index);
        }
      }}
      onClick={(event) => {
        if (checkboxRef.current && checkboxRef.current.contains(event.target)) {
          return;
        }
        if (props.sortable) {
          props.onSort(props.index);
        }
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {props.isSelectable && (
        <span className={css({ paddingRight: theme.sizing.scale300 })} ref={checkboxRef}>
          <Checkbox
            onChange={(e) => {
              if (props.isSelectedAll || props.isSelectedIndeterminate) {
                props.onSelectNone();
              } else {
                props.onSelectAll();
              }
            }}
            checked={props.isSelectedAll || props.isSelectedIndeterminate}
            isIndeterminate={props.isSelectedIndeterminate}
          />
        </span>
      )}
      {props.title}
      <div
        className={css({
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
        })}
      >
        {(props.isHovered || props.sortDirection) && props.sortable && (
          <div
            style={{
              backgroundColor,
              display: "flex",
              alignItems: "center",
              position: "absolute",
              right: -4,
            }}
          >
            {props.sortDirection === SORT_DIRECTIONS.DESC && (
              <ChevronDown
                color={
                  props.sortDirection
                    ? theme.colors.contentPrimary
                    : theme.colors.contentSecondary
                }
              />
            )}
            {(props.sortDirection === SORT_DIRECTIONS.ASC || !props.sortDirection) && (
              <ChevronUp
                color={
                  props.sortDirection
                    ? theme.colors.contentPrimary
                    : theme.colors.contentSecondary
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
});
HeaderCell.displayName = "HeaderCell";
export default HeaderCell;
