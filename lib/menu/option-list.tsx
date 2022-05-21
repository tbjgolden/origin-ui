import React from "react";
import { LocaleContext } from "../locale";
import { getOverrides } from "../helpers/overrides";
import { OPTION_LIST_SIZE } from "./constants";
import MaybeChildMenu from "./maybe-child-menu";
import { StyledListItem, StyledListItemAnchor } from "./styled-components";
function OptionList(props, ref) {
  const {
    getChildMenu,
    getItemLabel = (item2) => {
      return item2 ? item2.label : "";
    },
    item,
    onClick = () => {},
    onMouseEnter = () => {},
    overrides = {},
    renderHrefAsAnchor = true,
    resetMenu = () => {},
    size = OPTION_LIST_SIZE.default,
    $isHighlighted,
    renderAll,
    ...restProps
  } = props;
  const [ListItem, listItemProps] = getOverrides(overrides.ListItem, StyledListItem);
  const [ListItemAnchor, listItemAnchorProps] = getOverrides(
    overrides.ListItemAnchor,
    StyledListItemAnchor
  );
  const getItem = (item2) => {
    return item2.href && renderHrefAsAnchor ? (
      <ListItemAnchor $item={item2} href={item2.href} {...listItemAnchorProps}>
        {getItemLabel(item2)}
      </ListItemAnchor>
    ) : (
      <>{getItemLabel(item2)}</>
    );
  };
  return (
    <LocaleContext.Consumer>
      {(locale) => {
        return (
          <MaybeChildMenu
            getChildMenu={getChildMenu}
            isOpen={!!$isHighlighted}
            item={item}
            resetParentMenu={resetMenu}
            renderAll={renderAll}
            onClick={onClick}
            overrides={overrides}
          >
            <ListItem
              ref={ref}
              aria-label={
                getChildMenu && getChildMenu(item)
                  ? locale.menu.parentMenuItemAriaLabel
                  : null
              }
              item={item}
              onClick={onClick}
              onMouseEnter={onMouseEnter}
              $size={size}
              $isHighlighted={$isHighlighted}
              {...restProps}
              {...listItemProps}
            >
              {getItem({ isHighlighted: $isHighlighted, ...item })}
            </ListItem>
          </MaybeChildMenu>
        );
      }}
    </LocaleContext.Consumer>
  );
}
function areEqualShallow(a, b) {
  if (!a || !b) return false;
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function compare(prevProps, nextProps) {
  return (
    prevProps.$isHighlighted === nextProps.$isHighlighted &&
    prevProps.$isFocused === nextProps.$isFocused &&
    areEqualShallow(prevProps.item, nextProps.item) &&
    areEqualShallow(prevProps.overrides, nextProps.overrides) &&
    prevProps.size === nextProps.size &&
    prevProps.getItemLabel === nextProps.getItemLabel &&
    prevProps.getChildMenu === nextProps.getChildMenu &&
    prevProps.resetMenu === nextProps.resetMenu
  );
}
const forwarded = React.forwardRef(OptionList);
forwarded.displayName = "OptionList";
export default React.memo(forwarded, compare);
