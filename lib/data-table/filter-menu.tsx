import React from "react";
import { Button, SHAPE, SIZE } from "../button/index.js";
import { Filter as FilterIcon } from "../icon/index.js";
import { Input, SIZE as INPUT_SIZE } from "../input/index.js";
import { Popover, PLACEMENT } from "../popover/index.js";
import { useStyletron } from "../styles/index.js";
import { useUIDSeed } from "react-uid";
import { COLUMNS } from "./constants.js";
import { matchesQuery } from "./text-search.js";
import { LocaleContext } from "../locale/index.js";
import { isFocusVisible } from "../utils/focusVisible.js";
function ColumnIcon(props) {
  if (props.column.kind === COLUMNS.BOOLEAN) {
    return "01";
  }
  if (props.column.kind === COLUMNS.CATEGORICAL) {
    return "abc";
  }
  if (props.column.kind === COLUMNS.DATETIME) {
    return "dt";
  }
  if (props.column.kind === COLUMNS.NUMERICAL) {
    return "#";
  }
  return <FilterIcon />;
}
function Options(props) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);
  const [focusVisible, setFocusVisible] = React.useState(false);
  const seed = useUIDSeed();
  const buiRef = React.useRef(
    props.columns.map((col) => {
      return seed(col);
    })
  );
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
  return (
    <div
      className={css({
        backgroundColor: theme.colors.menuFill,
        minWidth: "320px",
        outline: focusVisible ? `3px solid ${theme.colors.accent}` : "none",
        paddingTop: theme.sizing.scale600,
        paddingBottom: theme.sizing.scale600,
      })}
    >
      <p
        className={css({
          ...theme.typography.font100,
          marginTop: "unset",
          paddingRight: theme.sizing.scale600,
          paddingLeft: theme.sizing.scale600,
        })}
      >
        {locale.datatable.optionsLabel}
      </p>
      {props.searchable && (
        <div
          className={css({
            marginBottom: theme.sizing.scale500,
            marginRight: theme.sizing.scale600,
            marginLeft: theme.sizing.scale600,
          })}
        >
          <Input
            inputRef={inputRef}
            value={props.query}
            onChange={(event) => {
              return props.onQueryChange(event.target.value);
            }}
            placeholder={locale.datatable.optionsSearch}
            size={INPUT_SIZE.compact}
            clearable
          />
        </div>
      )}
      {props.columns.length === 0 && (
        <div
          className={css({
            ...theme.typography.font100,
            paddingRight: theme.sizing.scale600,
            paddingLeft: theme.sizing.scale600,
          })}
        >
          {locale.datatable.optionsEmpty}
        </div>
      )}
      <ul
        onKeyDown={props.onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex="0"
        role="listbox"
        aria-activedescendant={`bui-${buiRef.current[props.highlightIndex]}`}
        className={css({
          listStyleType: "none",
          marginBlockStart: "unset",
          marginBlockEnd: "unset",
          maxHeight: "256px",
          paddingInlineStart: "unset",
          outline: "none",
          overflowY: "auto",
        })}
      >
        {props.columns.map((column, index) => {
          const isHighlighted = index === props.highlightIndex;
          return (
            <li
              id={`bui-${buiRef.current[index]}`}
              role="option"
              aria-selected={isHighlighted}
              onMouseEnter={() => {
                return props.onMouseEnter(index);
              }}
              onClick={() => {
                return props.onClick(column);
              }}
              key={column.title}
              className={css({
                ...theme.typography.font100,
                alignItems: "center",
                backgroundColor: isHighlighted ? theme.colors.menuFillHover : null,
                cursor: "pointer",
                display: "flex",
                paddingTop: theme.sizing.scale100,
                paddingRight: theme.sizing.scale600,
                paddingBottom: theme.sizing.scale100,
                paddingLeft: theme.sizing.scale600,
              })}
            >
              <div
                className={css({
                  ...theme.typography.font150,
                  fontSize: "8px",
                  alignItems: "center",
                  backgroundColor: theme.colors.backgroundTertiary,
                  borderRadius: theme.borders.radius200,
                  display: "flex",
                  height: theme.sizing.scale800,
                  justifyContent: "center",
                  marginRight: theme.sizing.scale300,
                  width: theme.sizing.scale800,
                })}
              >
                <ColumnIcon column={column} />
              </div>
              {column.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function FilterMenu(props) {
  const [, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);
  const [query, setQuery] = React.useState("");
  const [activeColumn, setActiveColumn] = React.useState(null);
  const handleOptionClick = React.useCallback(setActiveColumn, []);
  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setActiveColumn(null);
    setHighlightIndex(-1);
    setQuery("");
  }, []);
  const filterableColumns = React.useMemo(() => {
    return props.columns.filter((column) => {
      return column.filterable && !props.filters.has(column.title);
    });
  }, [props.columns, props.filters]);
  const columns = React.useMemo(() => {
    return filterableColumns.filter((column) => {
      return matchesQuery(column.title, query);
    });
  }, [filterableColumns, query]);
  const Filter = React.useMemo(() => {
    if (!activeColumn) return null;
    return activeColumn.renderFilter;
  }, [activeColumn]);
  const activeColumnData = React.useMemo(() => {
    const columnIndex = props.columns.indexOf(activeColumn);
    if (columnIndex < 0) return [];
    return props.rows.map((row) => {
      return props.columns[columnIndex].mapDataToValue(row.data);
    });
  }, [props.columns, props.rows, activeColumn]);
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      setActiveColumn(columns[highlightIndex]);
    }
    if (event.keyCode === 38) {
      event.preventDefault();
      setHighlightIndex(Math.max(0, highlightIndex - 1));
    }
    if (event.keyCode === 40) {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightIndex(Math.min(columns.length - 1, highlightIndex + 1));
      }
    }
  }
  return (
    <Popover
      focusLock
      returnFocus={true}
      placement={PLACEMENT.bottomLeft}
      content={() => {
        if (Filter && activeColumn) {
          return (
            <Filter
              data={activeColumnData}
              close={handleClose}
              setFilter={(filterParams) => {
                return props.onSetFilter(activeColumn.title, filterParams);
              }}
            />
          );
        }
        return (
          <Options
            columns={columns}
            highlightIndex={highlightIndex}
            onClick={handleOptionClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={setHighlightIndex}
            onQueryChange={setQuery}
            query={query}
            searchable={filterableColumns.length >= 10}
          />
        );
      }}
      onClick={() => {
        if (isOpen) {
          handleClose();
        } else {
          setIsOpen(true);
        }
      }}
      onClickOutside={handleClose}
      onEsc={handleClose}
      isOpen={isOpen}
      ignoreBoundary
    >
      <Button
        shape={SHAPE.pill}
        size={SIZE.compact}
        overrides={{
          BaseButton: {
            style: {
              marginLeft: theme.sizing.scale500,
              marginBottom: theme.sizing.scale500,
            },
          },
        }}
      >
        {locale.datatable.filterAdd}
      </Button>
    </Popover>
  );
}
export default FilterMenu;
