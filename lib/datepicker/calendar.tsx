import React from "react";
import { FormControl } from "../form-control";
import { LocaleContext } from "../locale";
import { Select } from "../select";
import CalendarHeader from "./calendar-header";
import Month from "./month";
import TimePicker from "../timepicker/timepicker";
import {
  StyledCalendarContainer,
  StyledMonthContainer,
  StyledRoot,
  StyledSelectorContainer,
} from "./styled-components";
import dateFnsAdapter from "./utils/date-fns-adapter";
import DateHelpers from "./utils/date-helpers";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import { DENSITY, ORIENTATION } from "./constants";
export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.getDateInView = () => {
      const { highlightedDate: highlightedDate2, value: value2 } = this.props;
      const minDate = this.dateHelpers.getEffectiveMinDate(this.props);
      const maxDate = this.dateHelpers.getEffectiveMaxDate(this.props);
      const current = this.dateHelpers.date();
      const initialDate = this.getSingleDate(value2) || highlightedDate2;
      if (initialDate) {
        return initialDate;
      } else {
        if (minDate && this.dateHelpers.isBefore(current, minDate)) {
          return minDate;
        } else if (maxDate && this.dateHelpers.isAfter(current, maxDate)) {
          return maxDate;
        }
      }
      return current;
    };
    this.handleMonthChange = (date) => {
      this.setHighlightedDate(this.dateHelpers.getStartOfMonth(date));
      if (this.props.onMonthChange) {
        this.props.onMonthChange({ date });
      }
    };
    this.handleYearChange = (date) => {
      this.setHighlightedDate(date);
      if (this.props.onYearChange) {
        this.props.onYearChange({ date });
      }
    };
    this.changeMonth = ({ date }) => {
      this.setState({ date }, () => {
        return this.handleMonthChange(this.state.date);
      });
    };
    this.changeYear = ({ date }) => {
      this.setState({ date }, () => {
        return this.handleYearChange(this.state.date);
      });
    };
    this.renderCalendarHeader = (date = this.state.date, order) => {
      return (
        <CalendarHeader
          {...this.props}
          key={`month-header-${order}`}
          date={date}
          order={order}
          onMonthChange={this.changeMonth}
          onYearChange={this.changeYear}
        />
      );
    };
    this.onKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
        case "Home":
        case "End":
        case "PageUp":
        case "PageDown":
          this.handleArrowKey(event.key);
          event.preventDefault();
          event.stopPropagation();
          break;
      }
    };
    this.handleArrowKey = (key) => {
      const { highlightedDate: oldDate } = this.state;
      let highlightedDate2 = oldDate;
      const currentDate = this.dateHelpers.date();
      switch (key) {
        case "ArrowLeft":
          highlightedDate2 = this.dateHelpers.subDays(
            highlightedDate2 ? highlightedDate2 : currentDate,
            1
          );
          break;
        case "ArrowRight":
          highlightedDate2 = this.dateHelpers.addDays(
            highlightedDate2 ? highlightedDate2 : currentDate,
            1
          );
          break;
        case "ArrowUp":
          highlightedDate2 = this.dateHelpers.subWeeks(
            highlightedDate2 ? highlightedDate2 : currentDate,
            1
          );
          break;
        case "ArrowDown":
          highlightedDate2 = this.dateHelpers.addWeeks(
            highlightedDate2 ? highlightedDate2 : currentDate,
            1
          );
          break;
        case "Home":
          highlightedDate2 = this.dateHelpers.getStartOfWeek(
            highlightedDate2 ? highlightedDate2 : currentDate
          );
          break;
        case "End":
          highlightedDate2 = this.dateHelpers.getEndOfWeek(
            highlightedDate2 ? highlightedDate2 : currentDate
          );
          break;
        case "PageUp":
          highlightedDate2 = this.dateHelpers.subMonths(
            highlightedDate2 ? highlightedDate2 : currentDate,
            1
          );
          break;
        case "PageDown":
          highlightedDate2 = this.dateHelpers.addMonths(
            highlightedDate2 ? highlightedDate2 : currentDate,
            1
          );
          break;
      }
      this.setState({ highlightedDate: highlightedDate2, date: highlightedDate2 });
    };
    this.focusCalendar = () => {
      if (!this.state.focused) {
        this.setState({ focused: true });
      }
    };
    this.blurCalendar = () => {
      if (__BROWSER__) {
        const activeElm = document.activeElement;
        if (this.calendar && !this.calendar.contains(activeElm)) {
          this.setState({ focused: false });
        }
      }
    };
    this.handleTabbing = (event) => {
      if (__BROWSER__ && event.keyCode === 9) {
        const activeElm = document.activeElement;
        const focusable = this.state.rootElement
          ? this.state.rootElement.querySelectorAll('[tabindex="0"]')
          : null;
        const length = focusable ? focusable.length : 0;
        if (event.shiftKey) {
          if (focusable && activeElm === focusable[0]) {
            event.preventDefault();
            focusable[length - 1].focus();
          }
        } else {
          if (focusable && activeElm === focusable[length - 1]) {
            event.preventDefault();
            focusable[0].focus();
          }
        }
      }
    };
    this.onDayFocus = (data) => {
      const { date } = data;
      this.setState({ highlightedDate: date });
      this.focusCalendar();
      this.props.onDayFocus && this.props.onDayFocus(data);
    };
    this.onDayMouseOver = (data) => {
      const { date } = data;
      this.setState({ highlightedDate: date });
      this.props.onDayMouseOver && this.props.onDayMouseOver(data);
    };
    this.onDayMouseLeave = (data) => {
      const { date } = data;
      const { value: value2 } = this.props;
      const selected = this.getSingleDate(value2);
      this.setState({ highlightedDate: selected || date });
      this.props.onDayMouseLeave && this.props.onDayMouseLeave(data);
    };
    this.handleDateChange = (data) => {
      const onChange = this.props?.onChange ?? ((params) => {});
      let updatedDate = data.date;
      if (Array.isArray(data.date)) {
        const newTimeState = [...this.state.time];
        const start = data.date[0]
          ? this.dateHelpers.applyDateToTime(newTimeState[0], data.date[0])
          : null;
        const end = data.date[1]
          ? this.dateHelpers.applyDateToTime(newTimeState[1], data.date[1])
          : null;
        newTimeState[0] = start;
        if (end) {
          updatedDate = [start, end];
          newTimeState[1] = end;
        } else {
          updatedDate = [start];
        }
        this.setState({ time: newTimeState });
      } else if (!Array.isArray(this.props.value) && data.date) {
        const newTimeState = this.dateHelpers.applyDateToTime(
          this.state.time[0],
          data.date
        );
        updatedDate = newTimeState;
        this.setState({ time: [newTimeState] });
      }
      onChange({ date: updatedDate });
    };
    this.handleTimeChange = (time2, index) => {
      const { onChange = (params) => {} } = this.props;
      const newTimeState = [...this.state.time];
      newTimeState[index] = this.dateHelpers.applyTimeToDate(newTimeState[index], time2);
      this.setState({ time: newTimeState });
      if (Array.isArray(this.props.value)) {
        const dates = this.props.value.map((date, i) => {
          if (date && index === i) {
            return this.dateHelpers.applyTimeToDate(date, time2);
          }
          return date;
        });
        onChange({ date: [dates[0], dates[1]] });
      } else {
        const date = this.dateHelpers.applyTimeToDate(this.props.value, time2);
        onChange({ date });
      }
    };
    this.renderMonths = (translations) => {
      const { overrides = {}, orientation } = this.props;
      const monthList = [];
      const [CalendarContainer, calendarContainerProps] = getOverrides(
        overrides.CalendarContainer,
        StyledCalendarContainer
      );
      const [MonthContainer, monthContainerProps] = getOverrides(
        overrides.MonthContainer,
        StyledMonthContainer
      );
      for (let i = 0; i < (this.props.monthsShown || 1); ++i) {
        const monthSubComponents = [];
        const monthDate = this.dateHelpers.addMonths(this.state.date, i);
        const monthKey = `month-${i}`;
        monthSubComponents.push(this.renderCalendarHeader(monthDate, i));
        monthSubComponents.push(
          <CalendarContainer
            key={monthKey}
            ref={(calendar) => {
              this.calendar = calendar;
            }}
            role="grid"
            aria-roledescription={translations.ariaRoleDescCalMonth}
            aria-multiselectable={this.props.range || null}
            onKeyDown={this.onKeyDown}
            {...calendarContainerProps}
            $density={this.props.density}
          >
            <Month
              adapter={this.props.adapter}
              date={monthDate}
              dateLabel={this.props.dateLabel}
              density={this.props.density}
              excludeDates={this.props.excludeDates}
              filterDate={this.props.filterDate}
              highlightedDate={this.state.highlightedDate}
              includeDates={this.props.includeDates}
              focusedCalendar={this.state.focused}
              range={this.props.range}
              locale={this.props.locale}
              maxDate={this.props.maxDate}
              minDate={this.props.minDate}
              month={this.dateHelpers.getMonth(this.state.date)}
              onDayBlur={this.blurCalendar}
              onDayFocus={this.onDayFocus}
              onDayClick={this.props.onDayClick}
              onDayMouseOver={this.onDayMouseOver}
              onDayMouseLeave={this.onDayMouseLeave}
              onChange={this.handleDateChange}
              overrides={overrides}
              value={this.props.value}
              peekNextMonth={this.props.peekNextMonth}
              fixedHeight={this.props.fixedHeight}
              hasLockedBehavior={!!this.props.hasLockedBehavior}
              selectedInput={this.props.selectedInput}
            />
          </CalendarContainer>
        );
        monthList.push(<div key={`month-component-${i}`}>{monthSubComponents}</div>);
      }
      return (
        <MonthContainer $orientation={orientation} {...monthContainerProps}>
          {monthList}
        </MonthContainer>
      );
    };
    this.renderTimeSelect = (value2, onChange, label) => {
      const { overrides = {} } = this.props;
      const [TimeSelectContainer, timeSelectContainerProps] = getOverrides(
        overrides.TimeSelectContainer,
        StyledSelectorContainer
      );
      const [TimeSelectFormControl, timeSelectFormControlProps] = getOverrides(
        overrides.TimeSelectFormControl,
        FormControl
      );
      const [TimeSelect, timeSelectProps] = getOverrides(
        overrides.TimeSelect,
        TimePicker
      );
      return (
        <TimeSelectContainer {...timeSelectContainerProps}>
          <TimeSelectFormControl label={label} {...timeSelectFormControlProps}>
            <TimeSelect
              value={value2 ? this.dateHelpers.date(value2) : value2}
              onChange={onChange}
              nullable
              {...timeSelectProps}
            />
          </TimeSelectFormControl>
        </TimeSelectContainer>
      );
    };
    this.renderQuickSelect = () => {
      const { overrides = {} } = this.props;
      const [QuickSelectContainer, quickSelectContainerProps] = getOverrides(
        overrides.QuickSelectContainer,
        StyledSelectorContainer
      );
      const [QuickSelectFormControl, quickSelectFormControlProps] = getOverrides(
        overrides.QuickSelectFormControl,
        FormControl
      );
      const [QuickSelect, { overrides: quickSelectOverrides, ...restQuickSelectProps }] =
        getOverrides(overrides.QuickSelect, Select);
      if (!this.props.quickSelect) {
        return null;
      }
      const NOW = this.dateHelpers.set(this.dateHelpers.date(), {
        hours: 12,
        minutes: 0,
        seconds: 0,
      });
      return (
        <LocaleContext.Consumer>
          {(locale) => {
            return (
              <QuickSelectContainer {...quickSelectContainerProps}>
                <QuickSelectFormControl
                  label={locale.datepicker.quickSelectLabel}
                  {...quickSelectFormControlProps}
                >
                  <QuickSelect
                    aria-label={locale.datepicker.quickSelectAriaLabel}
                    labelKey="id"
                    onChange={(params) => {
                      if (!params.option) {
                        this.setState({ quickSelectId: null });
                        this.props.onChange && this.props.onChange({ date: [] });
                      } else {
                        this.setState({
                          quickSelectId: params.option.id,
                        });
                        if (this.props.onChange) {
                          if (this.props.range) {
                            this.props.onChange({
                              date: [
                                params.option.beginDate,
                                params.option.endDate || NOW,
                              ],
                            });
                          } else {
                            this.props.onChange({
                              date: params.option.beginDate,
                            });
                          }
                        }
                      }
                      if (this.props.onQuickSelectChange) {
                        this.props.onQuickSelectChange(params.option);
                      }
                    }}
                    options={
                      this.props.quickSelectOptions || [
                        {
                          id: locale.datepicker.pastWeek,
                          beginDate: this.dateHelpers.subWeeks(NOW, 1),
                        },
                        {
                          id: locale.datepicker.pastMonth,
                          beginDate: this.dateHelpers.subMonths(NOW, 1),
                        },
                        {
                          id: locale.datepicker.pastThreeMonths,
                          beginDate: this.dateHelpers.subMonths(NOW, 3),
                        },
                        {
                          id: locale.datepicker.pastSixMonths,
                          beginDate: this.dateHelpers.subMonths(NOW, 6),
                        },
                        {
                          id: locale.datepicker.pastYear,
                          beginDate: this.dateHelpers.subYears(NOW, 1),
                        },
                        {
                          id: locale.datepicker.pastTwoYears,
                          beginDate: this.dateHelpers.subYears(NOW, 2),
                        },
                      ]
                    }
                    placeholder={locale.datepicker.quickSelectPlaceholder}
                    value={this.state.quickSelectId && [{ id: this.state.quickSelectId }]}
                    overrides={mergeOverrides(
                      {
                        Dropdown: {
                          style: {
                            textAlign: "start",
                          },
                        },
                      },
                      quickSelectOverrides
                    )}
                    {...restQuickSelectProps}
                  />
                </QuickSelectFormControl>
              </QuickSelectContainer>
            );
          }}
        </LocaleContext.Consumer>
      );
    };
    const { highlightedDate, value, adapter } = this.props;
    this.dateHelpers = new DateHelpers(adapter);
    const dateInView = this.getDateInView();
    let time = [];
    if (Array.isArray(value)) {
      time = [...value];
    } else if (value) {
      time = [value];
    }
    this.state = {
      highlightedDate:
        this.getSingleDate(value) ||
        (highlightedDate && this.dateHelpers.isSameMonth(dateInView, highlightedDate)
          ? highlightedDate
          : this.dateHelpers.date()),
      focused: false,
      date: dateInView,
      quickSelectId: null,
      rootElement: null,
      time,
    };
  }
  componentDidMount() {
    if (this.props.autoFocusCalendar) {
      this.focusCalendar();
    }
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.highlightedDate &&
      !this.dateHelpers.isSameDay(this.props.highlightedDate, prevProps.highlightedDate)
    ) {
      this.setState({
        date: this.props.highlightedDate,
      });
    }
    if (
      this.props.autoFocusCalendar &&
      this.props.autoFocusCalendar !== prevProps.autoFocusCalendar
    ) {
      this.focusCalendar();
    }
    if (prevProps.value !== this.props.value) {
      const nextDate = this.getDateInView();
      if (!this.isInView(nextDate)) {
        this.setState({
          date: nextDate,
        });
      }
    }
  }
  isInView(date) {
    const currentDate = this.state.date;
    const yearDelta =
      this.dateHelpers.getYear(date) - this.dateHelpers.getYear(currentDate);
    const monthDelta =
      yearDelta * 12 +
      this.dateHelpers.getMonth(date) -
      this.dateHelpers.getMonth(currentDate);
    return monthDelta >= 0 && monthDelta < (this.props.monthsShown || 1);
  }
  getSingleDate(value) {
    if (Array.isArray(value)) {
      return value[0] || null;
    }
    return value;
  }
  setHighlightedDate(date) {
    const { value } = this.props;
    const selected = this.getSingleDate(value);
    let nextState;
    nextState =
      selected &&
      this.dateHelpers.isSameMonth(selected, date) &&
      this.dateHelpers.isSameYear(selected, date)
        ? { highlightedDate: selected }
        : {
            highlightedDate: date,
          };
    this.setState(nextState);
  }
  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [startDate, endDate] = [this.props.value].flat();
    return (
      <LocaleContext.Consumer>
        {(locale) => {
          return (
            <Root
              $density={this.props.density}
              data-baseweb="calendar"
              role="application"
              aria-roledescription="datepicker"
              ref={(root) => {
                if (root && root instanceof HTMLElement && !this.state.rootElement) {
                  this.setState({
                    rootElement: root,
                  });
                }
              }}
              aria-label={locale.datepicker.ariaLabelCalendar}
              onKeyDown={this.props.trapTabbing ? this.handleTabbing : null}
              {...rootProps}
            >
              {this.renderMonths({
                ariaRoleDescCalMonth: locale.datepicker.ariaRoleDescriptionCalendarMonth,
              })}
              {this.props.timeSelectStart &&
                this.renderTimeSelect(
                  startDate,
                  (time) => {
                    return this.handleTimeChange(time, 0);
                  },
                  locale.datepicker.timeSelectStartLabel
                )}
              {this.props.timeSelectEnd &&
                this.props.range &&
                this.renderTimeSelect(
                  endDate,
                  (time) => {
                    return this.handleTimeChange(time, 1);
                  },
                  locale.datepicker.timeSelectEndLabel
                )}
              {this.renderQuickSelect()}
            </Root>
          );
        }}
      </LocaleContext.Consumer>
    );
  }
}
Calendar.defaultProps = {
  autoFocusCalendar: false,
  dateLabel: null,
  density: DENSITY.default,
  excludeDates: null,
  filterDate: null,
  highlightedDate: null,
  includeDates: null,
  range: false,
  locale: null,
  maxDate: null,
  minDate: null,
  onDayClick: () => {},
  onDayFocus: () => {},
  onDayMouseOver: () => {},
  onDayMouseLeave: () => {},
  onMonthChange: () => {},
  onYearChange: () => {},
  onChange: () => {},
  orientation: ORIENTATION.horizontal,
  overrides: {},
  peekNextMonth: false,
  adapter: dateFnsAdapter,
  value: null,
  trapTabbing: false,
};
