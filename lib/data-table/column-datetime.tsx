import * as React from "react";
import format from "date-fns/format";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getQuarter from "date-fns/getQuarter";
import getDay from "date-fns/getDay";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isEqual from "date-fns/isEqual";
import set from "date-fns/set";
import { Button, SIZE } from "../button";
import { ButtonGroup, MODE } from "../button-group";
import { Checkbox } from "../checkbox";
import {
  applyDateToTime,
  applyTimeToDate,
  getMonthInLocale,
  getWeekdayInLocale,
  getQuarterInLocale,
  getStartOfWeek,
  addDays
} from "../datepicker/utils";
import { Datepicker } from "../datepicker";
import { TimePicker } from "../timepicker";
import { useStyletron } from "../styles";
import { Select } from "../select";
import Column from "./column";
import { COLUMNS, DATETIME_OPERATIONS } from "./constants";
import FilterShell from "./filter-shell";
import { LocaleContext } from "../locale";
const DATE_FORMAT = "MM-dd-yyyy";
const MASK = "99-99-9999 - 99-99-9999";
const TIME_FORMAT = "HH:mm ss:SS";
const FORMAT_STRING = `${DATE_FORMAT} ${TIME_FORMAT}`;
function sortDates(a, b) {
  return a - b;
}
const RANGE_OPERATIONS = [
  {
    localeLabelKey: "datetimeFilterRangeDatetime",
    id: DATETIME_OPERATIONS.RANGE_DATETIME
  },
  {
    localeLabelKey: "datetimeFilterRangeDate",
    id: DATETIME_OPERATIONS.RANGE_DATE
  },
  {
    localeLabelKey: "datetimeFilterRangeTime",
    id: DATETIME_OPERATIONS.RANGE_TIME
  }
];
const CATEGORICAL_OPERATIONS = [
  {
    localeLabelKey: "datetimeFilterCategoricalWeekday",
    id: DATETIME_OPERATIONS.WEEKDAY
  },
  {
    localeLabelKey: "datetimeFilterCategoricalMonth",
    id: DATETIME_OPERATIONS.MONTH
  },
  {
    localeLabelKey: "datetimeFilterCategoricalQuarter",
    id: DATETIME_OPERATIONS.QUARTER
  },
  {
    localeLabelKey: "datetimeFilterCategoricalHalf",
    id: DATETIME_OPERATIONS.HALF
  },
  {
    localeLabelKey: "datetimeFilterCategoricalYear",
    id: DATETIME_OPERATIONS.YEAR
  }
];
const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];
const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const QUARTERS = [0, 1, 2, 3];
function Checks(props) {
  const [css, theme] = useStyletron();
  return <div className={css({ maxHeight: "256px", overflowY: "auto" })}>{props.options.map((item) => {
    const checked = props.value.includes(item.id);
    return <div key={item.id} className={css({ marginBottom: theme.sizing.scale200 })}><Checkbox checked={checked} onChange={() => {
      if (checked) {
        props.setValue((prev) => {
          return prev.filter((i) => {
            return i !== item.id;
          });
        });
      } else {
        props.setValue((prev) => {
          return [...prev, item.id];
        });
      }
    }}>{item.label}</Checkbox></div>;
  })}</div>;
}
function filterParamsToInitialState(input) {
  const output = {
    exclude: false,
    comparatorIndex: 0,
    rangeOperator: RANGE_OPERATIONS[0],
    categoricalOperator: CATEGORICAL_OPERATIONS[0],
    rangeDates: [],
    years: [],
    halves: [],
    quarters: [],
    months: [],
    weekdays: []
  };
  if (input) {
    const op = input.operation;
    if (input.range && input.range.length > 0) {
      if (op === DATETIME_OPERATIONS.RANGE_DATETIME) {
        output.rangeDates = input.range;
        output.rangeOperator = RANGE_OPERATIONS[0];
      } else if (op === DATETIME_OPERATIONS.RANGE_DATE) {
        output.rangeDates = input.range;
        output.rangeOperator = RANGE_OPERATIONS[1];
      } else if (op === DATETIME_OPERATIONS.RANGE_TIME) {
        output.rangeDates = input.range;
        output.rangeOperator = RANGE_OPERATIONS[2];
      }
    } else if (input.selection && input.selection.length > 0) {
      output.comparatorIndex = 1;
      switch (op) {
        case DATETIME_OPERATIONS.YEAR: {
          output.years = input.selection;
          output.categoricalOperator = CATEGORICAL_OPERATIONS[4];
          break;
        }
        case DATETIME_OPERATIONS.HALF: {
          output.halves = input.selection;
          output.categoricalOperator = CATEGORICAL_OPERATIONS[3];
          break;
        }
        case DATETIME_OPERATIONS.QUARTER: {
          output.quarters = input.selection;
          output.categoricalOperator = CATEGORICAL_OPERATIONS[2];
          break;
        }
        case DATETIME_OPERATIONS.MONTH: {
          output.months = input.selection;
          output.categoricalOperator = CATEGORICAL_OPERATIONS[1];
          break;
        }
        case DATETIME_OPERATIONS.WEEKDAY: {
          output.weekdays = input.selection;
          output.categoricalOperator = CATEGORICAL_OPERATIONS[0];
          break;
        }
      }
    }
    if (input.exclude) {
      output.exclude = input.exclude;
    }
  }
  return output;
}
function DatetimeFilter(props) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  const mountNode = React.useRef();
  const initialState = filterParamsToInitialState(props.filterParams);
  const datesSorted = React.useMemo(() => {
    return props.data.sort(sortDates);
  }, [props.data]);
  const presentYears = React.useMemo(() => {
    const dict = {};
    for (const date of props.data) {
      dict[getYear(date)] = true;
    }
    return Object.keys(dict).map((n) => {
      return Number.parseInt(n);
    });
  }, [props.data]);
  const startOfWeek = React.useMemo(() => {
    return getStartOfWeek(new Date(), props.locale);
  }, [props.locale]);
  const localizedWeekdays = React.useMemo(() => {
    return [
      ...WEEKDAYS.slice(getDay(startOfWeek), 7),
      ...WEEKDAYS.slice(0, getDay(startOfWeek))
    ];
  }, [props.locale]);
  const [exclude, setExclude] = React.useState(initialState.exclude);
  const [comparatorIndex, setComparatorIndex] = React.useState(initialState.comparatorIndex);
  const [rangeOperator, setRangeOperator] = React.useState([
    initialState.rangeOperator
  ]);
  const [categoricalOperator, setCategoricalOperator] = React.useState([
    initialState.categoricalOperator
  ]);
  const [rangeDates, setRangeDates] = React.useState(initialState.rangeDates.length > 0 ? initialState.rangeDates : [new Date(datesSorted[0]), new Date(datesSorted[datesSorted.length - 1])]);
  const [years, setYears] = React.useState(initialState.years);
  const [halves, setHalves] = React.useState(initialState.halves);
  const [quarters, setQuarters] = React.useState(initialState.quarters);
  const [months, setMonths] = React.useState(initialState.months);
  const [weekdays, setWeekdays] = React.useState(initialState.weekdays);
  const isRange = comparatorIndex === 0;
  const isCategorical = comparatorIndex === 1;
  return <FilterShell exclude={exclude} onExcludeChange={() => {
    return setExclude(!exclude);
  }} onApply={() => {
    if (isRange) {
      const op = rangeOperator[0].id;
      let description = "";
      if (op === DATETIME_OPERATIONS.RANGE_DATETIME) {
        const left = format(rangeDates[0], FORMAT_STRING);
        const right = format(rangeDates[1], FORMAT_STRING);
        description = `${left} - ${right}`;
      } else if (op === DATETIME_OPERATIONS.RANGE_DATE) {
        const left = format(rangeDates[0], DATE_FORMAT);
        const right = format(rangeDates[1], DATE_FORMAT);
        description = `${left} - ${right}`;
      } else if (op === DATETIME_OPERATIONS.RANGE_TIME) {
        const left = format(rangeDates[0], TIME_FORMAT);
        const right = format(rangeDates[1], TIME_FORMAT);
        description = `${left} - ${right}`;
      }
      props.setFilter({
        operation: op,
        range: rangeDates,
        selection: [],
        description,
        exclude
      });
    }
    if (isCategorical) {
      const op = categoricalOperator[0].id;
      let selection = [];
      let operatorLocaleLabelKey = "";
      let description = "";
      switch (op) {
        case DATETIME_OPERATIONS.WEEKDAY: {
          selection = weekdays;
          operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[0].localeLabelKey;
          description = weekdays.map((w) => {
            const day = addDays(startOfWeek, localizedWeekdays.indexOf(w));
            return getWeekdayInLocale(day, props.locale);
          }).join(", ");
          break;
        }
        case DATETIME_OPERATIONS.MONTH: {
          selection = months;
          operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[1].localeLabelKey;
          description = months.map((m) => {
            return getMonthInLocale(m, props.locale);
          }).join(", ");
          break;
        }
        case DATETIME_OPERATIONS.QUARTER: {
          selection = quarters;
          operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[2].localeLabelKey;
          description = quarters.map((q) => {
            return getQuarterInLocale(q, props.locale);
          }).join(", ");
          break;
        }
        case DATETIME_OPERATIONS.HALF: {
          selection = halves;
          operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[3].localeLabelKey;
          description = halves.map((h) => {
            return h === 0 ? locale.datatable.datetimeFilterCategoricalFirstHalf : locale.datatable.datetimeFilterCategoricalSecondHalf;
          }).join(", ");
          break;
        }
        case DATETIME_OPERATIONS.YEAR: {
          selection = years;
          operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[4].localeLabelKey;
          description = years.join(", ");
          break;
        }
      }
      if (operatorLocaleLabelKey) {
        description = `${locale.datatable[operatorLocaleLabelKey]} - ${description}`;
      }
      props.setFilter({
        operation: op,
        range: [],
        selection,
        description,
        exclude
      });
    }
    props.close();
  }}><div ref={mountNode}>
    <ButtonGroup size={SIZE.compact} mode={MODE.radio} selected={comparatorIndex} onClick={(_, index) => {
      return setComparatorIndex(index);
    }} overrides={{
      Root: {
        style: ({ $theme }) => {
          return { marginBottom: $theme.sizing.scale300 };
        }
      }
    }}>
      <Button type="button" overrides={{ BaseButton: { style: { width: "100%" } } }}>{locale.datatable.datetimeFilterRange}</Button>
      <Button type="button" overrides={{ BaseButton: { style: { width: "100%" } } }}>{locale.datatable.datetimeFilterCategorical}</Button>
    </ButtonGroup>
    {isRange && <div>
      <Select value={rangeOperator} onChange={(params) => {
        return setRangeOperator(params.value);
      }} mountNode={mountNode.current} options={RANGE_OPERATIONS.map((op) => {
        return {
          label: locale.datatable[op.localeLabelKey],
          id: op.id
        };
      })} size="compact" clearable={false} />
      <div className={css({ paddingTop: theme.sizing.scale600 })}>{(rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME || rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATE) && <Datepicker mountNode={mountNode.current} value={rangeDates} onChange={({ date }) => {
        if (Array.isArray(date)) {
          if (date.length === 0)
            return;
          const nextDates = date.map((d, i) => {
            return d ? applyDateToTime(rangeDates[i], d) : null;
          });
          setRangeDates(nextDates);
        }
      }} formatString={DATE_FORMAT} mask={MASK} placeholder="MM-DD-YYYY - MM-DD-YYYY" minDate={datesSorted[0]} maxDate={datesSorted[datesSorted.length - 1]} timeSelectStart={rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME} timeSelectEnd={rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME} overrides={{ TimeSelect: { props: { size: "compact" } } }} range size="compact" locale={props.locale} />}</div>
      {(rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME || rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_TIME) && <div className={css({
        display: "flex",
        paddingTop: theme.sizing.scale100
      })}>
        <div className={css({
          width: "100%",
          marginRight: theme.sizing.scale300
        })}><TimePicker format="24" value={rangeDates[0]} onChange={(time) => {
          return time && setRangeDates([
            applyTimeToDate(rangeDates[0], time),
            rangeDates[1]
          ]);
        }} creatable size="compact" /></div>
        <div className={css({
          width: "100%"
        })}><TimePicker format="24" value={rangeDates[1]} onChange={(time) => {
          return time && setRangeDates([
            rangeDates[0],
            applyTimeToDate(rangeDates[1], time)
          ]);
        }} creatable size="compact" /></div>
      </div>}
    </div>}
    {isCategorical && <div>
      <Select value={categoricalOperator} onChange={(params) => {
        return setCategoricalOperator(params.value);
      }} options={CATEGORICAL_OPERATIONS.map((op) => {
        return {
          label: locale.datatable[op.localeLabelKey],
          id: op.id
        };
      })} mountNode={mountNode.current} size="compact" clearable={false} />
      <div className={css({
        paddingLeft: theme.sizing.scale300,
        paddingTop: theme.sizing.scale500
      })}>
        {categoricalOperator[0].id === DATETIME_OPERATIONS.WEEKDAY && <Checks value={weekdays} setValue={setWeekdays} options={localizedWeekdays.map((w, offset) => {
          const day = addDays(startOfWeek, offset);
          return {
            label: getWeekdayInLocale(day, props.locale),
            id: w
          };
        })} />}
        {categoricalOperator[0].id === DATETIME_OPERATIONS.MONTH && <Checks value={months} setValue={setMonths} options={MONTHS.map((m) => {
          return {
            label: getMonthInLocale(m, props.locale),
            id: m
          };
        })} />}
        {categoricalOperator[0].id === DATETIME_OPERATIONS.QUARTER && <Checks value={quarters} setValue={setQuarters} options={QUARTERS.map((q) => {
          return {
            label: getQuarterInLocale(q, props.locale),
            id: q
          };
        })} />}
        {categoricalOperator[0].id === DATETIME_OPERATIONS.HALF && <Checks value={halves} setValue={setHalves} options={[
          {
            label: locale.datatable.datetimeFilterCategoricalFirstHalf,
            id: 0
          },
          {
            label: locale.datatable.datetimeFilterCategoricalSecondHalf,
            id: 1
          }
        ]} />}
        {categoricalOperator[0].id === DATETIME_OPERATIONS.YEAR && <Checks value={years} setValue={setYears} options={presentYears.map((year) => {
          return {
            label: year,
            id: year
          };
        })} />}
      </div>
    </div>}
  </div></FilterShell>;
}
function DatetimeCell(props) {
  const [css, theme] = useStyletron();
  return <div className={css({
    ...theme.typography.MonoParagraphXSmall,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    whiteSpace: "nowrap"
  })}>{format(props.value, props.formatString)}</div>;
}
const defaultOptions = {
  title: "",
  sortable: true,
  filterable: true,
  formatString: FORMAT_STRING
};
function DatetimeColumn(options) {
  const normalizedOptions = {
    ...defaultOptions,
    ...options
  };
  return Column({
    kind: COLUMNS.DATETIME,
    buildFilter: function(params) {
      return function(data) {
        let included = true;
        switch (params.operation) {
          case DATETIME_OPERATIONS.YEAR: {
            included = params.selection.includes(getYear(data));
            break;
          }
          case DATETIME_OPERATIONS.HALF: {
            const month = getMonth(data);
            const half = month < 6 ? 0 : 1;
            included = params.selection.includes(half);
            break;
          }
          case DATETIME_OPERATIONS.QUARTER: {
            const quarter = getQuarter(data) - 1;
            included = params.selection.includes(quarter);
            break;
          }
          case DATETIME_OPERATIONS.MONTH: {
            included = params.selection.includes(getMonth(data));
            break;
          }
          case DATETIME_OPERATIONS.WEEKDAY: {
            included = params.selection.includes(getDay(data));
            break;
          }
        }
        if (params.operation === DATETIME_OPERATIONS.RANGE_DATE || params.operation === DATETIME_OPERATIONS.RANGE_TIME || params.operation === DATETIME_OPERATIONS.RANGE_DATETIME) {
          let [left, right] = params.range;
          if (params.operation === DATETIME_OPERATIONS.RANGE_DATE) {
            left = set(left, { hours: 0, minutes: 0, seconds: 0 });
            right = set(right, { hours: 0, minutes: 0, seconds: 0 });
            data = set(data, { hours: 0, minutes: 0, seconds: 0 });
          }
          if (params.operation === DATETIME_OPERATIONS.RANGE_TIME) {
            left = set(left, { year: 2e3, month: 1, date: 1 });
            right = set(right, { year: 2e3, month: 1, date: 1 });
            data = set(data, { year: 2e3, month: 1, date: 1 });
          }
          const after = isAfter(data, left) || isEqual(data, left);
          const before = isBefore(data, right) || isEqual(data, right);
          included = after && before;
        }
        return params.exclude ? !included : included;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: normalizedOptions.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderDatetimeCell(props) {
      return <DatetimeCell value={props.value} formatString={normalizedOptions.formatString} />;
    },
    renderFilter: function RenderDatetimeFilter(props) {
      return <DatetimeFilter {...props} locale={options.locale} />;
    },
    sortable: normalizedOptions.sortable,
    sortFn: sortDates,
    title: options.title
  });
}
export default DatetimeColumn;
