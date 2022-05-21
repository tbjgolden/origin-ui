import React from "react";
import { List, AutoSizer } from "react-virtualized";
import defaultProps from "./default-props";
import {
  StyledFlagContainer,
  StyledCountrySelectDropdownContainer as DefaultContainer,
  StyledCountrySelectDropdownListItem as DefaultListItem,
  StyledCountrySelectDropdownFlagColumn as DefaultFlagColumn,
  StyledCountrySelectDropdownNameColumn as DefaultNameColumn,
  StyledCountrySelectDropdownDialcodeColumn as DefaultDialcodeColumn,
} from "./styled-components";
import { LocaleContext } from "../locale";
import { StyledEmptyState } from "../menu/styled-components";
import { getOverrides } from "../helpers/overrides";
import { iso2FlagEmoji } from "./utils";
CountrySelectDropdown.defaultProps = {
  maxDropdownHeight: defaultProps.maxDropdownHeight,
  overrides: {},
};
function CountrySelectDropdown(props) {
  const {
    $country: country,
    $forwardedRef: forwardedRef,
    $maxDropdownHeight: maxDropdownHeight,
    $mapIsoToLabel: mapIsoToLabel,
    $noResultsMsg: noResultsMsg,
    $overrides: overrides,
  } = props;
  const [Container, containerProps] = getOverrides(
    overrides.CountrySelectDropdown,
    DefaultContainer
  );
  const [ListItem, listItemProps] = getOverrides(
    overrides.CountrySelectDropdownListItem,
    DefaultListItem
  );
  const [FlagColumn, flagColumnProps] = getOverrides(
    overrides.CountrySelectDropdownFlagColumn,
    DefaultFlagColumn
  );
  const [FlagContainer, flagContainerProps] = getOverrides(
    overrides.FlagContainer,
    StyledFlagContainer
  );
  const [NameColumn, nameColumnProps] = getOverrides(
    overrides.CountrySelectDropdownNameColumn,
    DefaultNameColumn
  );
  const [Dialcode, dialcodeProps] = getOverrides(
    overrides.CountrySelectDropdownDialcodeColumn,
    DefaultDialcodeColumn
  );
  const [EmptyState, emptyStateProps] = getOverrides(
    overrides.EmptyState,
    StyledEmptyState
  );
  if (props.children.length === 0) {
    return (
      <LocaleContext.Consumer>
        {(locale) => {
          return (
            <EmptyState {...emptyStateProps}>
              {noResultsMsg || locale.menu.noResultsMsg}
            </EmptyState>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
  const children = React.Children.toArray(props.children);
  const scrollIndex = Math.min(
    children.findIndex((opt) => {
      return opt.props.item.id === country.id;
    }) + 5,
    children.length - 1
  );
  return (
    <Container ref={forwardedRef} $height={maxDropdownHeight} {...containerProps}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <List
              role="listbox"
              height={height}
              width={width}
              rowCount={children.length}
              rowHeight={42}
              scrollToIndex={scrollIndex}
              rowRenderer={({ index, key, style }) => {
                const { item, resetMenu, getItemLabel, ...rest } = children[index].props;
                const { id: iso, label, dialCode } = item;
                return (
                  <ListItem
                    key={key}
                    style={style}
                    item={item}
                    {...rest}
                    {...listItemProps}
                    data-iso={iso}
                  >
                    <FlagColumn {...flagColumnProps}>
                      <FlagContainer $iso={iso} data-iso={iso} {...flagContainerProps}>
                        {iso2FlagEmoji(iso)}
                      </FlagContainer>
                    </FlagColumn>
                    <NameColumn {...nameColumnProps}>
                      {mapIsoToLabel ? mapIsoToLabel(iso) : label}
                    </NameColumn>
                    <Dialcode {...dialcodeProps}>{dialCode}</Dialcode>
                  </ListItem>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </Container>
  );
}
const CountrySelectDropdownFwd = React.forwardRef((props, ref) => {
  return <CountrySelectDropdown {...props} $forwardedRef={ref} />;
});
CountrySelectDropdownFwd.displayName = "CountrySelectDropdownFwd";
export default CountrySelectDropdownFwd;
