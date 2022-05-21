import React from "react";
import {
  StyledDropdownContainer,
  StyledDropdown,
  StyledDropdownListItem,
  StyledOptionContent,
} from "./styled-components";
import { StatefulMenu } from "../menu";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
function groupOptions(options) {
  return options.reduce(
    (groups, option) => {
      if (option.__optgroup) {
        if (!groups[option.__optgroup]) {
          groups[option.__optgroup] = [];
        }
        groups[option.__optgroup].push(option);
      } else {
        groups.__ungrouped.push(option);
      }
      return groups;
    },
    { __ungrouped: [] }
  );
}
export default class SelectDropdown extends React.Component {
  constructor() {
    super(...arguments);
    this.getItemLabel = (option) => {
      const { getOptionLabel, overrides = {}, value, valueKey } = this.props;
      const [OptionContent, optionContentProps] = getOverrides(
        overrides.OptionContent,
        StyledOptionContent
      );
      let $selected;
      $selected = Array.isArray(value)
        ? !!value.find((selected) => {
            return selected && selected[valueKey] === option[valueKey];
          })
        : value[valueKey] === option[valueKey];
      const optionSharedProps = {
        $selected,
        $disabled: option.disabled,
        $isHighlighted: option.isHighlighted,
      };
      return (
        <OptionContent
          aria-readonly={option.disabled}
          aria-selected={$selected}
          key={option[valueKey]}
          {...this.getSharedProps()}
          {...optionSharedProps}
          {...optionContentProps}
        >
          {getOptionLabel({ option, optionState: optionSharedProps })}
        </OptionContent>
      );
    };
    this.onMouseDown = (e) => {
      e.nativeEvent.stopImmediatePropagation();
    };
    this.getHighlightedIndex = () => {
      const { value, options, valueKey } = this.props;
      let firstValue = {};
      if (Array.isArray(value) && value.length > 0) {
        firstValue = value[0];
      } else if (!Array.isArray(value)) {
        firstValue = value;
      }
      if (Object.keys(firstValue).length > 0) {
        const a = options.findIndex((option) => {
          return option && option[valueKey] === firstValue[valueKey];
        });
        return a === -1 ? 0 : a;
      }
      return 0;
    };
  }
  getSharedProps() {
    const { error, isLoading, multi, required, size, searchable, type, width } =
      this.props;
    return {
      $error: error,
      $isLoading: isLoading,
      $multi: multi,
      $required: required,
      $searchable: searchable,
      $size: size,
      $type: type,
      $width: width,
    };
  }
  render() {
    const {
      maxDropdownHeight,
      multi,
      noResultsMsg,
      onItemSelect,
      options = [],
      overrides = {},
      size,
    } = this.props;
    const [DropdownContainer, dropdownContainerProps] = getOverrides(
      overrides.DropdownContainer,
      StyledDropdownContainer
    );
    const [ListItem, listItemProps] = getOverrides(
      overrides.DropdownListItem,
      StyledDropdownListItem
    );
    const [
      OverriddenStatefulMenu,
      { overrides: statefulMenuOverrides = {}, ...restStatefulMenuProps },
    ] = getOverrides(overrides.StatefulMenu, StatefulMenu);
    const highlightedIndex = this.getHighlightedIndex();
    const groupedOptions = groupOptions(options);
    return (
      <DropdownContainer
        data-no-focus-lock
        ref={this.props.innerRef}
        {...this.getSharedProps()}
        {...dropdownContainerProps}
      >
        <OverriddenStatefulMenu
          noResultsMsg={noResultsMsg}
          onActiveDescendantChange={(id) => {
            if (this.props.onActiveDescendantChange) {
              this.props.onActiveDescendantChange(id);
            }
          }}
          onItemSelect={onItemSelect}
          items={groupedOptions}
          size={size}
          initialState={{
            isFocused: true,
            highlightedIndex,
          }}
          typeAhead={false}
          keyboardControlNode={this.props.keyboardControlNode}
          forceHighlight={true}
          overrides={mergeOverrides(
            {
              List: {
                component: StyledDropdown,
                style: (p) => {
                  return {
                    maxHeight: p.$maxHeight || null,
                  };
                },
                props: {
                  id: this.props.id ? this.props.id : null,
                  $maxHeight: maxDropdownHeight,
                  "aria-multiselectable": multi,
                },
              },
              Option: {
                props: {
                  getItemLabel: this.getItemLabel,
                  onMouseDown: this.onMouseDown,
                  overrides: {
                    ListItem: {
                      component: ListItem,
                      props: { ...listItemProps, role: "option" },
                      style: listItemProps.$style,
                    },
                  },
                  renderHrefAsAnchor: false,
                },
              },
            },
            {
              List: overrides.Dropdown || {},
              Option: overrides.DropdownOption || {},
              ...statefulMenuOverrides,
            }
          )}
          {...restStatefulMenuProps}
        />
      </DropdownContainer>
    );
  }
}
