import React from "react";
import { Button, SIZE } from "../button";
import { ButtonGroup, MODE } from "../button-group";
import { Input, SIZE as INPUT_SIZE } from "../input";
import { useStyletron } from "../styles";
import Column from "./column";
import { COLUMNS, NUMERICAL_FORMATS, MAX_BIN_COUNT, HISTOGRAM_SIZE } from "./constants";
import FilterShell from "./filter-shell";
import { LocaleContext } from "../locale";
import { bin, max as maxFunc, extent, scaleLinear, median, bisector } from "d3";
import { Slider } from "../slider";
function roundToFixed(value, precision) {
  const k = Math.pow(10, precision);
  return Math.round(value * k) / k;
}
function format(value, options) {
  if (typeof options.format === "function") {
    return options.format(value);
  }
  let formatted = value.toString();
  switch (options.format) {
    case NUMERICAL_FORMATS.ACCOUNTING: {
      const abs = Math.abs(value);
      if (value < 0) {
        formatted = `($${roundToFixed(abs, options.precision)})`;
        break;
      }
      formatted = `$${roundToFixed(abs, options.precision)}`;
      break;
    }
    case NUMERICAL_FORMATS.PERCENTAGE: {
      formatted = `${roundToFixed(value, options.precision)}%`;
      break;
    }
    case NUMERICAL_FORMATS.DEFAULT:
    default:
      formatted = roundToFixed(value, options.precision);
      break;
  }
  return formatted;
}
function validateInput(input) {
  return Boolean(Number.parseFloat(input)) || input === "" || input === "-";
}
const bisect = bisector((d) => {
  return d.x0;
});
const Histogram = React.memo(function Histogram2({
  data,
  lower,
  upper,
  isRange,
  exclude,
  precision,
}) {
  const [css, theme] = useStyletron();
  const { bins, xScale, yScale } = React.useMemo(() => {
    const bins2 = bin().thresholds(Math.min(data.length, MAX_BIN_COUNT))(data);
    const xScale2 = scaleLinear()
      .domain([bins2[0].x0, bins2[bins2.length - 1].x1])
      .range([0, HISTOGRAM_SIZE.width])
      .clamp(true);
    const yScale2 = scaleLinear()
      .domain([
        0,
        maxFunc(bins2, (d) => {
          return d.length;
        }),
      ])
      .nice()
      .range([HISTOGRAM_SIZE.height, 0]);
    return { bins: bins2, xScale: xScale2, yScale: yScale2 };
  }, [data]);
  const singleIndexNearest = React.useMemo(() => {
    if (isRange) {
      return null;
    }
    return bisect.center(bins, lower);
  }, [isRange, data, lower, upper]);
  return (
    <div
      className={css({
        display: "flex",
        marginTop: theme.sizing.scale600,
        marginLeft: theme.sizing.scale200,
        marginRight: 0,
        marginBottom: theme.sizing.scale400,
        justifyContent: "space-between",
        overflow: "visible",
      })}
    >
      <svg {...HISTOGRAM_SIZE}>
        {bins.map((d, index) => {
          const x = xScale(d.x0) + 1;
          const y = yScale(d.length);
          const width = Math.max(0, xScale(d.x1) - xScale(d.x0) - 1);
          const height = yScale(0) - yScale(d.length);
          let included;
          if (singleIndexNearest != null) {
            included = index === singleIndexNearest;
          } else {
            const withinLower = d.x1 > lower;
            const withinUpper = d.x0 <= upper;
            included = withinLower && withinUpper;
          }
          if (exclude) {
            included = !included;
          }
          return (
            <rect
              key={`bar-${index}`}
              fill={included ? theme.colors.primary : theme.colors.mono400}
              x={x}
              y={y}
              width={width}
              height={height}
            />
          );
        })}
      </svg>
    </div>
  );
});
function NumericalFilter(props) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  const precision = props.options.precision;
  const initialState = React.useMemo(() => {
    return (
      props.filterParams || {
        exclude: false,
        excludeKind: "range",
        comparatorIndex: 0,
        lowerValue: null,
        upperValue: null,
      }
    );
  }, [props.filterParams]);
  const [exclude, setExclude] = React.useState(initialState.exclude);
  const [comparatorIndex, setComparatorIndex] = React.useState(() => {
    switch (initialState.excludeKind) {
      case "value":
        return 1;
      case "range":
      default:
        return 0;
    }
  });
  const [min, max] = React.useMemo(() => {
    return extent(props.data);
  }, [props.data]);
  const [lv, setLower] = React.useState(() => {
    return roundToFixed(initialState.lowerValue || min, precision);
  });
  const [uv, setUpper] = React.useState(() => {
    return roundToFixed(initialState.upperValue || max, precision);
  });
  const [sv, setSingle] = React.useState(() => {
    return roundToFixed(initialState.lowerValue || median(props.data), precision);
  });
  const isRange = comparatorIndex === 0;
  const excludeKind = isRange ? "range" : "value";
  const [focused, setFocus] = React.useState(false);
  const [inputValueLower, inputValueUpper] = React.useMemo(() => {
    if (focused) {
      return [isRange ? lv : sv, uv];
    }
    let l = isRange ? lv : sv;
    l = validateInput(l) ? l : min;
    const h = validateInput(uv) ? uv : max;
    return [roundToFixed(l, precision), roundToFixed(h, precision)];
  }, [isRange, focused, sv, lv, uv, precision]);
  const sliderScale = React.useMemo(() => {
    return scaleLinear().domain([min, max]).rangeRound([1, MAX_BIN_COUNT]).clamp(true);
  }, [min, max]);
  let sliderValue = isRange
    ? [sliderScale(inputValueLower), sliderScale(inputValueUpper)]
    : [sliderScale(inputValueLower)];
  if (isRange && sliderValue[0] > sliderValue[1]) {
    sliderValue = [sliderValue[1], sliderValue[0]];
  }
  return (
    <FilterShell
      exclude={exclude}
      onExcludeChange={() => {
        return setExclude(!exclude);
      }}
      excludeKind={excludeKind}
      onApply={() => {
        if (isRange) {
          const lowerValue = Number.parseFloat(inputValueLower);
          const upperValue = Number.parseFloat(inputValueUpper);
          props.setFilter({
            description: `\u2265 ${lowerValue} and \u2264 ${upperValue}`,
            exclude,
            lowerValue,
            upperValue,
            excludeKind,
          });
        } else {
          const value = Number.parseFloat(inputValueLower);
          props.setFilter({
            description: `= ${value}`,
            exclude,
            lowerValue: inputValueLower,
            upperValue: inputValueLower,
            excludeKind,
          });
        }
        props.close();
      }}
    >
      <ButtonGroup
        size={SIZE.mini}
        mode={MODE.radio}
        selected={comparatorIndex}
        onClick={(_, index) => {
          return setComparatorIndex(index);
        }}
        overrides={{
          Root: {
            style: ({ $theme }) => {
              return { marginBottom: $theme.sizing.scale300 };
            },
          },
        }}
      >
        <Button
          type="button"
          overrides={{ BaseButton: { style: { width: "100%" } } }}
          aria-label={locale.datatable.numericalFilterRange}
        >
          {locale.datatable.numericalFilterRange}
        </Button>
        <Button
          type="button"
          overrides={{ BaseButton: { style: { width: "100%" } } }}
          aria-label={locale.datatable.numericalFilterSingleValue}
        >
          {locale.datatable.numericalFilterSingleValue}
        </Button>
      </ButtonGroup>
      <Histogram
        data={props.data}
        lower={inputValueLower}
        upper={inputValueUpper}
        isRange={isRange}
        exclude={exclude}
        precision={props.options.precision}
      />
      <div className={css({ display: "flex", justifyContent: "space-between" })}>
        <Slider
          key={isRange.toString()}
          min={1}
          max={MAX_BIN_COUNT}
          value={sliderValue}
          onChange={({ value }) => {
            if (!value) {
              return;
            }
            if (isRange) {
              const [lowerValue, upperValue] = value;
              setLower(sliderScale.invert(lowerValue));
              setUpper(sliderScale.invert(upperValue));
            } else {
              const [singleValue] = value;
              setSingle(sliderScale.invert(singleValue));
            }
          }}
          overrides={{
            InnerThumb: function InnerThumb({ $value, $thumbIndex }) {
              return <React.Fragment>{$value[$thumbIndex]}</React.Fragment>;
            },
            TickBar: ({ $min, $max }) => {
              return null;
            },
            ThumbValue: () => {
              return null;
            },
            Root: {
              style: () => {
                return {
                  width: "calc(100% + 14px)",
                  margin: "0 -7px",
                };
              },
            },
            InnerTrack: {
              style: ({ $theme }) => {
                if (!isRange) {
                  return {
                    background: theme.colors.mono400,
                  };
                }
              },
            },
            Thumb: {
              style: () => {
                return {
                  height: "18px",
                  width: "18px",
                  fontSize: "0px",
                };
              },
            },
          }}
        />
      </div>
      <div
        className={css({
          display: "flex",
          marginTop: theme.sizing.scale400,
          gap: "30%",
          justifyContent: "space-between",
        })}
      >
        <Input
          min={min}
          max={max}
          size={INPUT_SIZE.mini}
          overrides={{ Root: { style: { width: "100%" } } }}
          value={inputValueLower}
          onChange={(event) => {
            if (validateInput(event.target.value)) {
              isRange ? setLower(event.target.value) : setSingle(event.target.value);
            }
          }}
          onFocus={() => {
            return setFocus(true);
          }}
          onBlur={() => {
            return setFocus(false);
          }}
        />
        {isRange && (
          <Input
            min={min}
            max={max}
            size={INPUT_SIZE.mini}
            overrides={{
              Input: { style: { textAlign: "right" } },
              Root: { style: { width: "100%" } },
            }}
            value={inputValueUpper}
            onChange={(event) => {
              if (validateInput(event.target.value)) {
                setUpper(event.target.value);
              }
            }}
            onFocus={() => {
              return setFocus(true);
            }}
            onBlur={() => {
              return setFocus(false);
            }}
          />
        )}
      </div>
    </FilterShell>
  );
}
function NumericalCell(props) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        ...theme.typography.MonoParagraphXSmall,
        display: "flex",
        justifyContent: theme.direction !== "rtl" ? "flex-end" : "flex-start",
        color: props.highlight(props.value) ? theme.colors.contentNegative : null,
        width: "100%",
      })}
    >
      {format(props.value, {
        format: props.format,
        precision: props.precision,
      })}
    </div>
  );
}
const defaultOptions = {
  title: "",
  sortable: true,
  filterable: true,
  format: NUMERICAL_FORMATS.DEFAULT,
  highlight: (n) => {
    return false;
  },
  precision: 0,
};
function NumericalColumn(options) {
  const normalizedOptions = {
    ...defaultOptions,
    ...options,
  };
  if (
    normalizedOptions.format !== NUMERICAL_FORMATS.DEFAULT &&
    (options.precision === null || options.precision === void 0)
  ) {
    normalizedOptions.precision = 2;
  }
  if (
    normalizedOptions.format === NUMERICAL_FORMATS.ACCOUNTING &&
    (options.highlight === null || options.highlight === void 0)
  ) {
    normalizedOptions.highlight = (n) => {
      return n < 0;
    };
  }
  return Column({
    kind: COLUMNS.NUMERICAL,
    buildFilter: function (params) {
      return function (data) {
        const value = roundToFixed(data, normalizedOptions.precision);
        const included = value >= params.lowerValue && value <= params.upperValue;
        return params.exclude ? !included : included;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: normalizedOptions.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderNumericalCell(props) {
      return (
        <NumericalCell
          {...props}
          format={normalizedOptions.format}
          highlight={normalizedOptions.highlight}
          precision={normalizedOptions.precision}
        />
      );
    },
    renderFilter: function RenderNumericalFilter(props) {
      return <NumericalFilter {...props} options={normalizedOptions} />;
    },
    sortable: normalizedOptions.sortable,
    sortFn: function (a, b) {
      return a - b;
    },
    title: normalizedOptions.title,
  });
}
export default NumericalColumn;
