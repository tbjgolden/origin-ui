import * as React from "react";
import { Button, SIZE, KIND } from "../button";
import { ButtonGroup } from "../button-group";
import { Checkbox, StyledLabel } from "../checkbox";
import Search from "../icon/search";
import { Input, SIZE as INPUT_SIZE } from "../input";
import { useStyletron, withStyle } from "../styles";
import { LabelSmall } from "../typography";
import Column from "./column";
import { COLUMNS } from "./constants";
import { LocaleContext } from "../locale";
import FilterShell from "./filter-shell";
import { matchesQuery, splitByQuery, HighlightCellText } from "./text-search";
function InputBefore() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.sizing.scale500,
      })}
    >
      <Search size="18px" />
    </div>
  );
}
function FilterQuickControls(props) {
  const locale = React.useContext(LocaleContext);
  return (
    <ButtonGroup size={SIZE.mini} kind={KIND.tertiary}>
      <Button type="button" onClick={props.onSelectAll}>
        {locale.datatable.categoricalFilterSelectAll}
      </Button>
      <Button type="button" onClick={props.onClearSelection}>
        {locale.datatable.categoricalFilterSelectClear}
      </Button>
    </ButtonGroup>
  );
}
const StyledHighlightLabel = withStyle(StyledLabel, (props) => {
  const style = {
    whiteSpace: "pre",
    color: props.$isActive
      ? props.$theme.colors.contentPrimary
      : props.$theme.colors.contentSecondary,
  };
  if (!props.$isFirst) {
    style.paddingLeft = null;
  }
  return style;
});
function HighlightCheckboxLabel(props) {
  const { children, ...restProps } = props;
  if (!props.query) {
    return <StyledLabel {...restProps}>{children}</StyledLabel>;
  }
  return splitByQuery(children, props.query).map((el, i) => {
    if (matchesQuery(el, props.query)) {
      return (
        <StyledHighlightLabel {...restProps} key={i} $isFirst={!i} $isActive>
          {el}
        </StyledHighlightLabel>
      );
    }
    return (
      <StyledHighlightLabel {...restProps} key={i} $isFirst={!i}>
        {el}
      </StyledHighlightLabel>
    );
  });
}
export function CategoricalFilter(props) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  const [selection, setSelection] = React.useState(
    props.filterParams ? props.filterParams.selection : /* @__PURE__ */ new Set()
  );
  const [exclude, setExclude] = React.useState(
    props.filterParams ? props.filterParams.exclude : false
  );
  const [query, setQuery] = React.useState("");
  const categories = React.useMemo(() => {
    return props.data.reduce((set, category) => {
      return set.add(category);
    }, /* @__PURE__ */ new Set());
  }, [props.data]);
  const checkboxStyles = css({ marginBottom: theme.sizing.scale200 });
  const showQuery = Boolean(categories.size >= 10);
  const filteredCategories = [...categories]
    .map((c) => {
      return c;
    })
    .filter((c) => {
      return matchesQuery(c, query);
    });
  return (
    <FilterShell
      exclude={exclude}
      onExcludeChange={() => {
        return setExclude(!exclude);
      }}
      onApply={() => {
        props.setFilter({
          description: [...selection].join(", "),
          exclude,
          selection,
        });
        props.close();
      }}
    >
      {showQuery && (
        <Input
          size={INPUT_SIZE.compact}
          overrides={{ Before: InputBefore }}
          value={query}
          onChange={(event) => {
            return setQuery(event.target.value);
          }}
          clearable
        />
      )}
      {!query && (
        <div
          style={{
            marginTop: showQuery ? theme.sizing.scale600 : null,
          }}
        >
          <FilterQuickControls
            onSelectAll={() => {
              for (const c of categories) selection.add(c);
              setSelection(new Set(selection));
            }}
            onClearSelection={() => {
              setSelection(/* @__PURE__ */ new Set());
            }}
          />
        </div>
      )}
      <div
        className={css({
          maxHeight: "256px",
          overflowY: "auto",
          marginTop: theme.sizing.scale600,
        })}
      >
        {filteredCategories.length === 0 && (
          <LabelSmall>{locale.datatable.categoricalFilterEmpty}</LabelSmall>
        )}
        {filteredCategories.length > 0 &&
          filteredCategories.map((category, i) => {
            return (
              <div className={checkboxStyles} key={i}>
                <Checkbox
                  checked={selection.has(category)}
                  onChange={() => {
                    if (selection.has(category)) {
                      selection.delete(category);
                    } else {
                      selection.add(category);
                    }
                    setSelection(new Set(selection));
                  }}
                  overrides={{
                    Label: { component: HighlightCheckboxLabel, props: { query } },
                  }}
                >
                  {category}
                </Checkbox>
              </div>
            );
          })}
      </div>
    </FilterShell>
  );
}
function CategoricalCell(props) {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: "-webkit-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      })}
    >
      {props.textQuery ? (
        <HighlightCellText text={props.value} query={props.textQuery} />
      ) : (
        props.value
      )}
    </div>
  );
}
function CategoricalColumn(options) {
  return Column({
    kind: COLUMNS.CATEGORICAL,
    buildFilter: function (params) {
      return function (data) {
        const included = params.selection.has(data);
        return params.exclude ? !included : included;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: options.filterable === void 0 ? true : options.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: CategoricalCell,
    renderFilter: CategoricalFilter,
    sortable: options.sortable === void 0 ? true : options.sortable,
    sortFn: function (a, b) {
      return a.localeCompare(b);
    },
    textQueryFilter: function (textQuery, data) {
      return data.toLowerCase().includes(textQuery.toLowerCase());
    },
    title: options.title,
  });
}
export default CategoricalColumn;
