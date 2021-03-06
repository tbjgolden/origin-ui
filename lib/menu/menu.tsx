import React from "react";
import { LocaleContext } from "../locale";
import { StyledList, StyledEmptyState, StyledOptgroupHeader } from "./styled-components";
import OptionList from "./option-list";
import { getOverrides } from "../helpers/overrides";
import { isFocusVisible, forkFocus, forkBlur } from "../utils/focusVisible";
export default function Menu(props) {
  const {
    overrides = {},
    "aria-label": ariaLabel = "Menu",
    rootRef = React.createRef(),
    focusMenu = () => {},
    unfocusMenu = () => {},
    handleMouseLeave = () => {},
    handleKeyDown = (event) => {},
    renderAll = false,
  } = props;
  const [focusVisible, setFocusVisible] = React.useState(false);
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
  const [List, listProps] = getOverrides(overrides.List, StyledList);
  const [Option, optionProps] = getOverrides(overrides.Option, OptionList);
  const [EmptyState, emptyStateProps] = getOverrides(
    overrides.EmptyState,
    StyledEmptyState
  );
  const [OptgroupHeader, optgroupHeaderProps] = getOverrides(
    overrides.OptgroupHeader,
    StyledOptgroupHeader
  );
  const groupedItems = Array.isArray(props.items)
    ? { __ungrouped: props.items }
    : props.items;
  const optgroups = Object.keys(groupedItems);
  const [elements] = optgroups.reduce(
    ([els, itemIndex], optgroup) => {
      if (optgroup !== "__ungrouped") {
        els.push(
          <OptgroupHeader key={optgroup} {...optgroupHeaderProps}>
            {optgroup}
          </OptgroupHeader>
        );
      }
      const groupItems = groupedItems[optgroup].map((item, index) => {
        itemIndex = itemIndex + 1;
        const {
          getRequiredItemProps = (item2, index2) => {
            return {};
          },
        } = props;
        const {
          disabled,
          isFocused,
          isHighlighted,
          resetMenu = () => {},
          ...restProps
        } = getRequiredItemProps(item, itemIndex);
        return (
          <Option
            renderAll={renderAll}
            key={itemIndex}
            item={item}
            overrides={props.overrides}
            resetMenu={resetMenu}
            role="option"
            $disabled={disabled}
            $isFocused={isFocused}
            $isHighlighted={isHighlighted}
            aria-disabled={disabled}
            aria-selected={isHighlighted && isFocused}
            {...restProps}
            {...optionProps}
          />
        );
      });
      return [els.concat(groupItems), itemIndex];
    },
    [[], -1]
  );
  const isEmpty = optgroups.every((optgroup) => {
    return groupedItems[optgroup].length === 0;
  });
  return (
    <LocaleContext.Consumer>
      {(locale) => {
        return (
          <List
            aria-activedescendant={props.activedescendantId || null}
            role="listbox"
            aria-label={ariaLabel}
            ref={rootRef}
            onMouseEnter={focusMenu}
            onMouseLeave={handleMouseLeave}
            onMouseOver={focusMenu}
            onFocus={forkFocus({ onFocus: focusMenu }, handleFocus)}
            onBlur={forkBlur({ onBlur: unfocusMenu }, handleBlur)}
            onKeyDown={(event) => {
              if (props.isFocused) {
                handleKeyDown(event);
              }
            }}
            tabIndex={0}
            data-baseweb="menu"
            $isFocusVisible={focusVisible}
            {...listProps}
          >
            {isEmpty ? (
              <EmptyState aria-live="polite" aria-atomic {...emptyStateProps}>
                {props.noResultsMsg || locale.menu.noResultsMsg}
              </EmptyState>
            ) : (
              elements
            )}
          </List>
        );
      }}
    </LocaleContext.Consumer>
  );
}
