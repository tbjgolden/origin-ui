import * as React from "react";
import { MaskedInput } from "../input";
import { Popover, PLACEMENT } from "../popover";
import Calendar from "./calendar";
import { getOverrides } from "../helpers/overrides";
import getInterpolatedString from "../helpers/i18n-interpolation";
import { LocaleContext } from "../locale";
import {
  StyledInputWrapper,
  StyledInputLabel,
  StyledStartDate,
  StyledEndDate,
} from "./styled-components";
import DateHelpers from "./utils/date-helpers";
import dateFnsAdapter from "./utils/date-fns-adapter";
import { INPUT_ROLE, RANGED_CALENDAR_BEHAVIOR } from "./constants";
export const DEFAULT_DATE_FORMAT = "yyyy/MM/dd";
const INPUT_DELIMITER = "\u2013";
const combineSeparatedInputs = (
  newInputValue,
  prevCombinedInputValue = "",
  inputRole
) => {
  let inputValue = newInputValue;
  const [prevStartDate = "", prevEndDate = ""] = prevCombinedInputValue.split(
    ` ${INPUT_DELIMITER} `
  );
  if (inputRole === INPUT_ROLE.startDate && prevEndDate) {
    inputValue = `${inputValue} ${INPUT_DELIMITER} ${prevEndDate}`;
  }
  if (inputRole === INPUT_ROLE.endDate) {
    inputValue = `${prevStartDate} ${INPUT_DELIMITER} ${inputValue}`;
  }
  return inputValue;
};
export default class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = (date) => {
      const onChange = this.props.onChange;
      const onRangeChange = this.props.onRangeChange;
      if (Array.isArray(date)) {
        if (onChange && date.every(Boolean)) {
          onChange({ date });
        }
        if (onRangeChange) {
          onRangeChange({ date: [...date] });
        }
      } else {
        if (onChange) {
          onChange({ date });
        }
        if (onRangeChange) {
          onRangeChange({ date });
        }
      }
    };
    this.onCalendarSelect = (data) => {
      let isOpen = false;
      let isPseudoFocused = false;
      let calendarFocused = false;
      let nextDate = data.date;
      if (Array.isArray(nextDate) && this.props.range) {
        if (!nextDate[0] || !nextDate[1]) {
          isOpen = true;
          isPseudoFocused = true;
          calendarFocused = null;
        } else if (nextDate[0] && nextDate[1]) {
          const [start, end] = nextDate;
          if (this.dateHelpers.isAfter(start, end)) {
            if (this.hasLockedBehavior()) {
              nextDate = this.props.value;
              isOpen = true;
            } else {
              nextDate = [start, start];
            }
          } else if (
            this.dateHelpers.dateRangeIncludesDates(nextDate, this.props.excludeDates)
          ) {
            nextDate = this.props.value;
            isOpen = true;
          }
          if (this.state.lastActiveElm) {
            this.state.lastActiveElm.focus();
          }
        }
      } else if (this.state.lastActiveElm) {
        this.state.lastActiveElm.focus();
      }
      const onlyTimeChanged = (prev, next) => {
        if (!prev || !next) return false;
        const p = this.dateHelpers.format(prev, "keyboardDate");
        const n = this.dateHelpers.format(next, "keyboardDate");
        if (p === n) {
          return (
            this.dateHelpers.getHours(prev) !== this.dateHelpers.getHours(next) ||
            this.dateHelpers.getMinutes(prev) !== this.dateHelpers.getMinutes(next)
          );
        }
        return false;
      };
      const prevValue = this.props.value;
      if (Array.isArray(nextDate) && Array.isArray(prevValue)) {
        if (
          nextDate.some((d, i) => {
            return onlyTimeChanged(prevValue[i], d);
          })
        ) {
          isOpen = true;
        }
      } else if (
        !Array.isArray(nextDate) &&
        !Array.isArray(prevValue) &&
        onlyTimeChanged(prevValue, nextDate)
      ) {
        isOpen = true;
      }
      this.setState({
        isOpen,
        isPseudoFocused,
        ...(calendarFocused === null ? {} : { calendarFocused }),
        inputValue: this.formatDisplayValue(nextDate),
      });
      this.handleChange(nextDate);
    };
    this.formatDisplayValue = (date) => {
      const { displayValueAtRangeIndex, formatDisplayValue, range } = this.props;
      const formatString = this.normalizeDashes(this.props.formatString);
      if (typeof displayValueAtRangeIndex === "number") {
        if (__DEV__) {
          if (!range) {
            console.error("displayValueAtRangeIndex only applies if range");
          }
          if (range && displayValueAtRangeIndex > 1) {
            console.error("displayValueAtRangeIndex value must be 0 or 1");
          }
        }
        if (date && Array.isArray(date)) {
          const value = date[displayValueAtRangeIndex];
          if (formatDisplayValue) {
            return formatDisplayValue(value, formatString);
          }
          return this.formatDate(value, formatString);
        }
      }
      if (formatDisplayValue) {
        return formatDisplayValue(date, formatString);
      }
      return this.formatDate(date, formatString);
    };
    this.open = (inputRole) => {
      this.setState(
        {
          isOpen: true,
          isPseudoFocused: true,
          calendarFocused: false,
          selectedInput: inputRole,
        },
        this.props.onOpen
      );
    };
    this.close = () => {
      const isPseudoFocused = false;
      this.setState(
        {
          isOpen: false,
          selectedInput: null,
          isPseudoFocused,
          calendarFocused: false,
        },
        this.props.onClose
      );
    };
    this.handleEsc = () => {
      if (this.state.lastActiveElm) {
        this.state.lastActiveElm.focus();
      }
      this.close();
    };
    this.handleInputBlur = () => {
      if (!this.state.isPseudoFocused) {
        this.close();
      }
    };
    this.getMask = () => {
      const { formatString, mask, range, separateRangeInputs } = this.props;
      if (mask === null || (mask === void 0 && formatString !== DEFAULT_DATE_FORMAT)) {
        return null;
      }
      if (mask) {
        return this.normalizeDashes(mask);
      }
      if (range && !separateRangeInputs) {
        return `9999/99/99 ${INPUT_DELIMITER} 9999/99/99`;
      }
      return "9999/99/99";
    };
    this.handleInputChange = (event, inputRole) => {
      const inputValue =
        this.props.range && this.props.separateRangeInputs
          ? combineSeparatedInputs(
              event.currentTarget.value,
              this.state.inputValue,
              inputRole
            )
          : event.currentTarget.value;
      const mask = this.getMask();
      const formatString = this.normalizeDashes(this.props.formatString);
      if (
        (typeof mask === "string" && inputValue === mask.replace(/9/g, " ")) ||
        inputValue.length === 0
      ) {
        if (this.props.range) {
          this.handleChange([]);
        } else {
          this.handleChange(null);
        }
      }
      this.setState({ inputValue });
      const parseDateString = (dateString) => {
        if (formatString === DEFAULT_DATE_FORMAT) {
          return this.dateHelpers.parse(dateString, "slashDate", this.props.locale);
        }
        return this.dateHelpers.parseString(dateString, formatString, this.props.locale);
      };
      if (this.props.range && typeof this.props.displayValueAtRangeIndex !== "number") {
        const [left, right] = this.normalizeDashes(inputValue).split(
          ` ${INPUT_DELIMITER} `
        );
        let startDate = this.dateHelpers.date(left);
        let endDate = this.dateHelpers.date(right);
        if (formatString) {
          startDate = parseDateString(left);
          endDate = parseDateString(right);
        }
        const datesValid =
          this.dateHelpers.isValid(startDate) && this.dateHelpers.isValid(endDate);
        const rangeValid =
          this.dateHelpers.isAfter(endDate, startDate) ||
          this.dateHelpers.isEqual(startDate, endDate);
        if (datesValid && rangeValid) {
          this.handleChange([startDate, endDate]);
        }
      } else {
        const dateString = this.normalizeDashes(inputValue);
        let date = this.dateHelpers.date(dateString);
        const formatString2 = this.props.formatString;
        date =
          dateString.replace(/(\s)*/g, "").length <
          formatString2.replace(/(\s)*/g, "").length
            ? null
            : parseDateString(dateString);
        const { displayValueAtRangeIndex, range, value } = this.props;
        if (date && this.dateHelpers.isValid(date)) {
          if (
            range &&
            Array.isArray(value) &&
            typeof displayValueAtRangeIndex === "number"
          ) {
            let [left, right] = value;
            if (displayValueAtRangeIndex === 0) {
              left = date;
              if (!right) {
                this.handleChange([left]);
              } else {
                if (
                  this.dateHelpers.isAfter(right, left) ||
                  this.dateHelpers.isEqual(left, right)
                ) {
                  this.handleChange([left, right]);
                } else {
                  this.handleChange([...value]);
                }
              }
            } else if (displayValueAtRangeIndex === 1) {
              right = date;
              if (!left) {
                this.handleChange([right, right]);
              } else {
                if (
                  this.dateHelpers.isAfter(right, left) ||
                  this.dateHelpers.isEqual(left, right)
                ) {
                  this.handleChange([left, right]);
                } else {
                  this.handleChange([...value]);
                }
              }
            }
          } else {
            this.handleChange(date);
          }
        }
      }
    };
    this.handleKeyDown = (event) => {
      if (!this.state.isOpen && event.keyCode === 40) {
        this.open();
      } else if (this.state.isOpen && event.key === "ArrowDown") {
        event.preventDefault();
        this.focusCalendar();
      } else if (this.state.isOpen && event.keyCode === 9) {
        this.close();
      }
    };
    this.focusCalendar = () => {
      if (__BROWSER__) {
        const lastActiveElm = document.activeElement;
        this.setState({
          calendarFocused: true,
          lastActiveElm,
        });
      }
    };
    this.normalizeDashes = (inputValue) => {
      return inputValue.replace(/-/g, INPUT_DELIMITER).replace(/—/g, INPUT_DELIMITER);
    };
    this.hasLockedBehavior = () => {
      return (
        this.props.rangedCalendarBehavior === RANGED_CALENDAR_BEHAVIOR.locked &&
        this.props.range &&
        this.props.separateRangeInputs
      );
    };
    this.dateHelpers = new DateHelpers(props.adapter);
    this.state = {
      calendarFocused: false,
      isOpen: false,
      selectedInput: null,
      isPseudoFocused: false,
      lastActiveElm: null,
      inputValue: this.formatDisplayValue(props.value) || "",
    };
  }
  getNullDatePlaceholder(formatString) {
    return (this.getMask() || formatString)
      .split(INPUT_DELIMITER)[0]
      .replace(/\d|[a-z]/g, " ");
  }
  formatDate(date, formatString) {
    const format = (date2) => {
      if (formatString === DEFAULT_DATE_FORMAT) {
        return this.dateHelpers.format(date2, "slashDate", this.props.locale);
      }
      return this.dateHelpers.formatDate(date2, formatString, this.props.locale);
    };
    if (!date) {
      return "";
    } else if (Array.isArray(date) && !date[0] && !date[1]) {
      return "";
    } else if (Array.isArray(date) && !date[0] && date[1]) {
      const endDate = format(date[1]);
      const startDate = this.getNullDatePlaceholder(formatString);
      return [startDate, endDate].join(` ${INPUT_DELIMITER} `);
    } else if (Array.isArray(date)) {
      return date
        .map((day) => {
          return day ? format(day) : "";
        })
        .join(` ${INPUT_DELIMITER} `);
    } else {
      return format(date);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        inputValue: this.formatDisplayValue(this.props.value),
      });
    }
  }
  renderInputComponent(locale, inputRole) {
    const { overrides = {} } = this.props;
    const [InputComponent, inputProps] = getOverrides(overrides.Input, MaskedInput);
    const placeholder =
      this.props.placeholder || this.props.placeholder === ""
        ? this.props.placeholder
        : this.props.range && !this.props.separateRangeInputs
        ? `YYYY/MM/DD ${INPUT_DELIMITER} YYYY/MM/DD`
        : "YYYY/MM/DD";
    const [startDate = "", endDate = ""] = (this.state.inputValue || "").split(
      ` ${INPUT_DELIMITER} `
    );
    const value =
      inputRole === INPUT_ROLE.startDate
        ? startDate
        : inputRole === INPUT_ROLE.endDate
        ? endDate
        : this.state.inputValue;
    return (
      <InputComponent
        aria-disabled={this.props.disabled}
        aria-label={
          this.props["aria-label"] ||
          (this.props.range
            ? locale.datepicker.ariaLabelRange
            : locale.datepicker.ariaLabel)
        }
        error={this.props.error}
        positive={this.props.positive}
        aria-describedby={this.props["aria-describedby"]}
        aria-labelledby={this.props["aria-labelledby"]}
        aria-required={this.props.required || null}
        disabled={this.props.disabled}
        size={this.props.size}
        value={value}
        onFocus={() => {
          return this.open(inputRole);
        }}
        onBlur={this.handleInputBlur}
        onKeyDown={this.handleKeyDown}
        onChange={(event) => {
          return this.handleInputChange(event, inputRole);
        }}
        placeholder={placeholder}
        mask={this.getMask()}
        required={this.props.required}
        clearable={this.props.clearable}
        {...inputProps}
      />
    );
  }
  render() {
    const {
      overrides = {},
      startDateLabel = "Start Date",
      endDateLabel = "End Date",
    } = this.props;
    const [PopoverComponent, popoverProps] = getOverrides(overrides.Popover, Popover);
    const [InputWrapper, inputWrapperProps] = getOverrides(
      overrides.InputWrapper,
      StyledInputWrapper
    );
    const [StartDate, startDateProps] = getOverrides(
      overrides.StartDate,
      StyledStartDate
    );
    const [EndDate, endDateProps] = getOverrides(overrides.EndDate, StyledEndDate);
    const [InputLabel, inputLabelProps] = getOverrides(
      overrides.InputLabel,
      StyledInputLabel
    );
    return (
      <LocaleContext.Consumer>
        {(locale) => {
          return (
            <React.Fragment>
              <PopoverComponent
                focusLock={false}
                autoFocus={false}
                mountNode={this.props.mountNode}
                placement={PLACEMENT.bottom}
                isOpen={this.state.isOpen}
                onClickOutside={this.close}
                onEsc={this.handleEsc}
                content={
                  <Calendar
                    adapter={this.props.adapter}
                    autoFocusCalendar={this.state.calendarFocused}
                    trapTabbing={true}
                    value={this.props.value}
                    {...this.props}
                    onChange={this.onCalendarSelect}
                    selectedInput={this.state.selectedInput}
                    hasLockedBehavior={this.hasLockedBehavior()}
                  />
                }
                {...popoverProps}
              >
                <InputWrapper
                  {...inputWrapperProps}
                  $separateRangeInputs={
                    this.props.range && this.props.separateRangeInputs
                  }
                >
                  {this.props.range && this.props.separateRangeInputs ? (
                    <>
                      <StartDate {...startDateProps}>
                        <InputLabel {...inputLabelProps}>{startDateLabel}</InputLabel>
                        {this.renderInputComponent(locale, INPUT_ROLE.startDate)}
                      </StartDate>
                      <EndDate {...endDateProps}>
                        <InputLabel {...inputLabelProps}>{endDateLabel}</InputLabel>
                        {this.renderInputComponent(locale, INPUT_ROLE.endDate)}
                      </EndDate>
                    </>
                  ) : (
                    <>{this.renderInputComponent(locale)}</>
                  )}
                </InputWrapper>
              </PopoverComponent>
              <p
                id={this.props["aria-describedby"]}
                style={{
                  position: "fixed",
                  width: "0px",
                  height: "0px",
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  padding: 0,
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  clipPath: "inset(100%)",
                }}
              >
                {locale.datepicker.screenReaderMessageInput}
              </p>
              <p
                aria-live="assertive"
                style={{
                  position: "fixed",
                  width: "0px",
                  height: "0px",
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  padding: 0,
                  overflow: "hidden",
                  clip: "rect(0, 0, 0, 0)",
                  clipPath: "inset(100%)",
                }}
              >
                {!this.props.value ||
                (Array.isArray(this.props.value) &&
                  !this.props.value[0] &&
                  !this.props.value[1])
                  ? ""
                  : !Array.isArray(this.props.value)
                  ? getInterpolatedString(locale.datepicker.selectedDate, {
                      date: this.state.inputValue || "",
                    })
                  : this.props.value[0] && this.props.value[1]
                  ? getInterpolatedString(locale.datepicker.selectedDateRange, {
                      startDate: this.formatDisplayValue(this.props.value[0]),
                      endDate: this.formatDisplayValue(this.props.value[1]),
                    })
                  : `${getInterpolatedString(locale.datepicker.selectedDate, {
                      date: this.formatDisplayValue(this.props.value[0]),
                    })} ${locale.datepicker.selectSecondDatePrompt}`}
              </p>
            </React.Fragment>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}
Datepicker.defaultProps = {
  "aria-describedby": "datepicker--screenreader--message--input",
  value: null,
  formatString: DEFAULT_DATE_FORMAT,
  adapter: dateFnsAdapter,
};
