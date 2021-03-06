import React from "react";
import { StyledDay, StyledDayLabel } from "./styled-components";
import dateFnsAdapter from "./utils/date-fns-adapter";
import DateHelpers from "./utils/date-helpers";
import { getOverrides } from "../helpers/overrides";
import { LocaleContext } from "../locale";
import { isFocusVisible } from "../utils/focusVisible";
import { INPUT_ROLE } from "./constants";
export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      isFocusVisible: false,
    };
    this.getDateProp = () => {
      return this.props.date === void 0 ? this.dateHelpers.date() : this.props.date;
    };
    this.getMonthProp = () => {
      return this.props.month === void 0 || this.props.month === null
        ? this.dateHelpers.getMonth(this.getDateProp())
        : this.props.month;
    };
    this.onSelect = (selectedDate) => {
      const { range, value } = this.props;
      let nextDate;
      if (Array.isArray(value) && range && this.props.hasLockedBehavior) {
        const currentDate = this.props.value;
        let nextStartDate = null;
        let nextEndDate = null;
        if (this.props.selectedInput === INPUT_ROLE.startDate) {
          nextStartDate = selectedDate;
          nextEndDate =
            Array.isArray(currentDate) && currentDate[1] ? currentDate[1] : null;
        } else if (this.props.selectedInput === INPUT_ROLE.endDate) {
          nextStartDate =
            Array.isArray(currentDate) && currentDate[0] ? currentDate[0] : null;
          nextEndDate = selectedDate;
        }
        nextDate = [nextStartDate];
        if (nextEndDate) {
          nextDate.push(nextEndDate);
        }
      } else if (Array.isArray(value) && range && !this.props.hasLockedBehavior) {
        const [start, end] = value;
        if ((!start && !end) || (start && end)) {
          nextDate = [selectedDate, null];
        } else if (!start && end && this.dateHelpers.isAfter(end, selectedDate)) {
          nextDate = [selectedDate, end];
        } else if (!start && end && this.dateHelpers.isAfter(selectedDate, end)) {
          nextDate = [end, selectedDate];
        } else if (start && !end && this.dateHelpers.isAfter(selectedDate, start)) {
          nextDate = [start, selectedDate];
        } else {
          nextDate = [selectedDate, start];
        }
      } else {
        nextDate = selectedDate;
      }
      this.props.onSelect({ date: nextDate });
    };
    this.onKeyDown = (event) => {
      const date = this.getDateProp();
      const { highlighted, disabled } = this.props;
      if (event.key === "Enter" && highlighted && !disabled) {
        event.preventDefault();
        this.onSelect(date);
      }
    };
    this.onClick = (event) => {
      const date = this.getDateProp();
      const { disabled } = this.props;
      if (!disabled) {
        this.props.onClick({ event, date });
        this.onSelect(date);
      }
    };
    this.onFocus = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisible: true });
      }
      this.props.onFocus({ event, date: this.getDateProp() });
    };
    this.onBlur = (event) => {
      if (this.state.isFocusVisible !== false) {
        this.setState({ isFocusVisible: false });
      }
      this.props.onBlur({ event, date: this.getDateProp() });
    };
    this.onMouseOver = (event) => {
      this.setState({ isHovered: true });
      this.props.onMouseOver({ event, date: this.getDateProp() });
    };
    this.onMouseLeave = (event) => {
      this.setState({ isHovered: false });
      this.props.onMouseLeave({ event, date: this.getDateProp() });
    };
    this.isOutsideMonth = () => {
      const month = this.getMonthProp();
      return month !== void 0 && month !== this.dateHelpers.getMonth(this.getDateProp());
    };
    this.getOrderedDates = () => {
      const { highlightedDate, value } = this.props;
      if (
        !value ||
        !Array.isArray(value) ||
        !value[0] ||
        (!value[1] && !highlightedDate)
      ) {
        return [];
      }
      const firstValue = value[0];
      const secondValue = value.length > 1 && value[1] ? value[1] : highlightedDate;
      if (!firstValue || !secondValue) {
        return [];
      }
      const firstDate = this.clampToDayStart(firstValue);
      const secondDate = this.clampToDayStart(secondValue);
      return this.dateHelpers.isAfter(firstDate, secondDate)
        ? [secondDate, firstDate]
        : [firstDate, secondDate];
    };
    this.isOutsideOfMonthButWithinRange = () => {
      const date = this.clampToDayStart(this.getDateProp());
      const dates = this.getOrderedDates();
      if (dates.length < 2 || this.dateHelpers.isSameDay(dates[0], dates[1])) {
        return false;
      }
      const day = this.dateHelpers.getDate(date);
      if (day > 15) {
        const firstDayOfNextMonth = this.clampToDayStart(
          this.dateHelpers.addDays(this.dateHelpers.getEndOfMonth(date), 1)
        );
        return (
          this.dateHelpers.isOnOrBeforeDay(
            dates[0],
            this.dateHelpers.getEndOfMonth(date)
          ) && this.dateHelpers.isOnOrAfterDay(dates[1], firstDayOfNextMonth)
        );
      } else {
        const lastDayOfPreviousMonth = this.clampToDayStart(
          this.dateHelpers.subDays(this.dateHelpers.getStartOfMonth(date), 1)
        );
        return (
          this.dateHelpers.isOnOrAfterDay(
            dates[1],
            this.dateHelpers.getStartOfMonth(date)
          ) && this.dateHelpers.isOnOrBeforeDay(dates[0], lastDayOfPreviousMonth)
        );
      }
    };
    this.clampToDayStart = (dt) => {
      const { setSeconds, setMinutes, setHours } = this.dateHelpers;
      return setSeconds(setMinutes(setHours(dt, 0), 0), 0);
    };
    this.dateHelpers = new DateHelpers(props.adapter);
  }
  componentDidMount() {
    if (
      this.dayElm &&
      this.props.focusedCalendar &&
      (this.props.highlighted || (!this.props.highlightedDate && this.isSelected()))
    ) {
      this.dayElm.focus();
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.dayElm &&
      this.props.focusedCalendar &&
      (this.props.highlighted || (!this.props.highlightedDate && this.isSelected()))
    ) {
      this.dayElm.focus();
    }
  }
  isSelected() {
    const date = this.getDateProp();
    const { value } = this.props;
    return Array.isArray(value)
      ? this.dateHelpers.isSameDay(date, value[0]) ||
          this.dateHelpers.isSameDay(date, value[1])
      : this.dateHelpers.isSameDay(date, value);
  }
  isPseudoSelected() {
    const date = this.getDateProp();
    const { value } = this.props;
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (!start && !end) {
        return false;
      }
      if (start && end) {
        return this.dateHelpers.isDayInRange(
          this.clampToDayStart(date),
          this.clampToDayStart(start),
          this.clampToDayStart(end)
        );
      }
    }
  }
  isPseudoHighlighted() {
    const date = this.getDateProp();
    const { value, highlightedDate } = this.props;
    if (Array.isArray(value)) {
      const [start, end] = value;
      if (!start && !end) {
        return false;
      }
      if (highlightedDate && start && !end) {
        return this.dateHelpers.isAfter(highlightedDate, start)
          ? this.dateHelpers.isDayInRange(
              this.clampToDayStart(date),
              this.clampToDayStart(start),
              this.clampToDayStart(highlightedDate)
            )
          : this.dateHelpers.isDayInRange(
              this.clampToDayStart(date),
              this.clampToDayStart(highlightedDate),
              this.clampToDayStart(start)
            );
      }
      if (highlightedDate && !start && end) {
        return this.dateHelpers.isAfter(highlightedDate, end)
          ? this.dateHelpers.isDayInRange(
              this.clampToDayStart(date),
              this.clampToDayStart(end),
              this.clampToDayStart(highlightedDate)
            )
          : this.dateHelpers.isDayInRange(
              this.clampToDayStart(date),
              this.clampToDayStart(highlightedDate),
              this.clampToDayStart(end)
            );
      }
    }
  }
  getSharedProps() {
    const date = this.getDateProp();
    const { value, highlightedDate, range, highlighted, peekNextMonth } = this.props;
    const $isHighlighted = highlighted;
    const $selected = this.isSelected();
    const $hasRangeHighlighted = !!(
      Array.isArray(value) &&
      range &&
      highlightedDate &&
      ((value[0] &&
        !value[1] &&
        !this.dateHelpers.isSameDay(value[0], highlightedDate)) ||
        (!value[0] && value[1] && !this.dateHelpers.isSameDay(value[1], highlightedDate)))
    );
    const $outsideMonth = !peekNextMonth && this.isOutsideMonth();
    const $outsideMonthWithinRange = !!(
      Array.isArray(value) &&
      range &&
      $outsideMonth &&
      !peekNextMonth &&
      this.isOutsideOfMonthButWithinRange()
    );
    return {
      $date: date,
      $density: this.props.density,
      $disabled: this.props.disabled,
      $endDate:
        (Array.isArray(value) &&
          !!(value[0] && value[1]) &&
          range &&
          $selected &&
          this.dateHelpers.isSameDay(date, value[1])) ||
        false,
      $hasDateLabel: !!this.props.dateLabel,
      $hasRangeHighlighted,
      $hasRangeOnRight:
        Array.isArray(value) &&
        $hasRangeHighlighted &&
        highlightedDate &&
        ((value[0] && this.dateHelpers.isAfter(highlightedDate, value[0])) ||
          (value[1] && this.dateHelpers.isAfter(highlightedDate, value[1]))),
      $hasRangeSelected: Array.isArray(value) ? !!(value[0] && value[1]) : false,
      $highlightedDate: highlightedDate,
      $isHighlighted,
      $isHovered: this.state.isHovered,
      $isFocusVisible: this.state.isFocusVisible,
      $startOfMonth: this.dateHelpers.isStartOfMonth(date),
      $endOfMonth: this.dateHelpers.isEndOfMonth(date),
      $month: this.getMonthProp(),
      $outsideMonth,
      $outsideMonthWithinRange,
      $peekNextMonth: peekNextMonth,
      $pseudoHighlighted:
        range && !$isHighlighted && !$selected ? this.isPseudoHighlighted() : false,
      $pseudoSelected: range && !$selected ? this.isPseudoSelected() : false,
      $range: range,
      $selected,
      $startDate:
        Array.isArray(value) && value[0] && value[1] && range && $selected
          ? this.dateHelpers.isSameDay(date, value[0])
          : false,
      $hasLockedBehavior: this.props.hasLockedBehavior,
      $selectedInput: this.props.selectedInput,
      $value: this.props.value,
    };
  }
  getAriaLabel(sharedProps, localeContext) {
    const date = this.getDateProp();
    return `${
      sharedProps.$selected
        ? sharedProps.$range
          ? sharedProps.$endDate
            ? localeContext.datepicker.selectedEndDateLabel
            : localeContext.datepicker.selectedStartDateLabel
          : localeContext.datepicker.selectedLabel
        : sharedProps.$disabled
        ? localeContext.datepicker.dateNotAvailableLabel
        : localeContext.datepicker.chooseLabel
    } ${this.dateHelpers.format(date, "fullOrdinalWeek", this.props.locale)}. ${
      !sharedProps.$disabled ? localeContext.datepicker.dateAvailableLabel : ""
    }`;
  }
  render() {
    const date = this.getDateProp();
    const { peekNextMonth, overrides = {} } = this.props;
    const sharedProps = this.getSharedProps();
    const [Day2, dayProps] = getOverrides(overrides.Day, StyledDay);
    const [DayLabel, dayLabelProps] = getOverrides(overrides.DayLabel, StyledDayLabel);
    const dateLabel = this.props.dateLabel && this.props.dateLabel(date);
    return !peekNextMonth && sharedProps.$outsideMonth ? (
      <Day2
        role="gridcell"
        {...sharedProps}
        {...dayProps}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    ) : (
      <LocaleContext.Consumer>
        {(locale) => {
          return (
            <Day2
              aria-label={this.getAriaLabel(sharedProps, locale)}
              ref={(dayElm) => {
                this.dayElm = dayElm;
              }}
              role="gridcell"
              aria-roledescription="button"
              tabIndex={
                this.props.highlighted ||
                (!this.props.highlightedDate && this.isSelected())
                  ? 0
                  : -1
              }
              {...sharedProps}
              {...dayProps}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onClick={this.onClick}
              onKeyDown={this.onKeyDown}
              onMouseOver={this.onMouseOver}
              onMouseLeave={this.onMouseLeave}
            >
              <div>{this.dateHelpers.getDate(date)}</div>
              {dateLabel ? (
                <DayLabel {...sharedProps} {...dayLabelProps}>
                  {dateLabel}
                </DayLabel>
              ) : null}
            </Day2>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}
Day.defaultProps = {
  disabled: false,
  highlighted: false,
  range: false,
  adapter: dateFnsAdapter,
  onClick: () => {},
  onSelect: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onMouseOver: () => {},
  onMouseLeave: () => {},
  overrides: {},
  peekNextMonth: true,
  value: null,
};
