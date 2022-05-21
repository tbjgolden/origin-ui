import * as React from "react";
import ChevronRight from "../icon/chevron-right";
import ChevronLeft from "../icon/chevron-left";
import ChevronDown from "../icon/chevron-down";
import dateFnsAdapter from "./utils/date-fns-adapter";
import DateHelpers from "./utils/date-helpers";
import { getFilteredMonthItems } from "./utils/calendar-header-helpers";
import { StatefulMenu } from "../menu";
import { Popover } from "../popover";
import { LocaleContext } from "../locale";
import { ThemeContext } from "../styles/theme-provider";
import {
  StyledCalendarHeader,
  StyledMonthHeader,
  StyledMonthYearSelectButton,
  StyledMonthYearSelectIconContainer,
  StyledNextButton,
  StyledPrevButton,
  StyledWeekdayHeader
} from "./styled-components";
import { DENSITY, ORIENTATION, WEEKDAYS } from "./constants";
import { getOverrides, mergeOverrides } from "../helpers/overrides";
import { forkBlur, forkFocus, isFocusVisible } from "../utils/focusVisible";
const navBtnStyle = ({ $theme }) => {
  return {
    cursor: "pointer"
  };
};
const MIN_YEAR = 2e3;
const MAX_YEAR = 2030;
const MIN_MONTH = 0;
const MAX_MONTH = 11;
const DIRECTION = {
  NEXT: "next",
  PREVIOUS: "previous"
};
function idToYearMonth(id) {
  return id.split("-").map(Number);
}
export default class CalendarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMonthDropdownOpen: false,
      isYearDropdownOpen: false,
      isFocusVisible: false
    };
    this.getDateProp = () => {
      return this.props.date || this.dateHelpers.date();
    };
    this.getYearItems = () => {
      const date = this.getDateProp();
      const maxDate = this.props.maxDate;
      const minDate = this.props.minDate;
      const maxYear = maxDate ? this.dateHelpers.getYear(maxDate) : MAX_YEAR;
      const minYear = minDate ? this.dateHelpers.getYear(minDate) : MIN_YEAR;
      const selectedMonth = this.dateHelpers.getMonth(date);
      this.yearItems = Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
        return minYear + i;
      }).map((year) => {
        return { id: year.toString(), label: year.toString() };
      });
      const monthOfMaxDate = maxDate ? this.dateHelpers.getMonth(maxDate) : MAX_MONTH;
      const monthOfMinDate = minDate ? this.dateHelpers.getMonth(minDate) : MIN_MONTH;
      const maxYearMonths = Array.from({ length: monthOfMaxDate + 1 }, (x, i) => {
        return i;
      });
      const minYearMonths = Array.from({ length: 12 - monthOfMinDate }, (x, i) => {
        return i + monthOfMinDate;
      });
      if (selectedMonth > maxYearMonths[maxYearMonths.length - 1]) {
        const lastIdx = this.yearItems.length - 1;
        this.yearItems[lastIdx] = { ...this.yearItems[lastIdx], disabled: true };
      }
      if (selectedMonth < minYearMonths[0]) {
        this.yearItems[0] = { ...this.yearItems[0], disabled: true };
      }
    };
    this.getMonthItems = () => {
      const date = this.getDateProp();
      const year = this.dateHelpers.getYear(date);
      const maxDate = this.props.maxDate;
      const minDate = this.props.minDate;
      const maxYear = maxDate ? this.dateHelpers.getYear(maxDate) : MAX_YEAR;
      const minYear = minDate ? this.dateHelpers.getYear(minDate) : MIN_YEAR;
      const monthOfMaxDate = maxDate ? this.dateHelpers.getMonth(maxDate) : MAX_MONTH;
      const maxYearMonths = Array.from({ length: monthOfMaxDate + 1 }, (x, i) => {
        return i;
      });
      const monthOfMinDate = minDate ? this.dateHelpers.getMonth(minDate) : MIN_MONTH;
      const minYearMonths = Array.from({ length: 12 - monthOfMinDate }, (x, i) => {
        return i + monthOfMinDate;
      });
      const maxMinYearMonthsIntersection = maxYearMonths.filter((year2) => {
        return minYearMonths.includes(year2);
      });
      const filterMonthsList = year === maxYear && year === minYear ? maxMinYearMonthsIntersection : year === maxYear ? maxYearMonths : year === minYear ? minYearMonths : null;
      const formatMonthLabel = (month) => {
        return this.dateHelpers.getMonthInLocale(month, this.props.locale);
      };
      this.monthItems = getFilteredMonthItems({
        filterMonthsList,
        formatMonthLabel
      });
    };
    this.increaseMonth = () => {
      if (this.props.onMonthChange) {
        this.props.onMonthChange({
          date: this.dateHelpers.addMonths(this.getDateProp(), 1 - this.props.order)
        });
      }
    };
    this.decreaseMonth = () => {
      if (this.props.onMonthChange) {
        this.props.onMonthChange({
          date: this.dateHelpers.subMonths(this.getDateProp(), 1)
        });
      }
    };
    this.isMultiMonthHorizontal = () => {
      const { monthsShown, orientation } = this.props;
      if (!monthsShown) {
        return false;
      }
      return orientation === ORIENTATION.horizontal && monthsShown > 1;
    };
    this.isHiddenPaginationButton = (direction) => {
      const { monthsShown, order } = this.props;
      if (!!monthsShown && this.isMultiMonthHorizontal()) {
        if (direction === DIRECTION.NEXT) {
          const isLastMonth = order === monthsShown - 1;
          return !isLastMonth;
        } else {
          const isFirstMonth = order === 0;
          return !isFirstMonth;
        }
      }
      return false;
    };
    this.handleFocus = (event) => {
      if (isFocusVisible(event)) {
        this.setState({ isFocusVisible: true });
      }
    };
    this.handleBlur = (event) => {
      if (this.state.isFocusVisible !== false) {
        this.setState({ isFocusVisible: false });
      }
    };
    this.renderPreviousMonthButton = ({ locale, theme }) => {
      const date = this.getDateProp();
      const { overrides = {}, density } = this.props;
      const allPrevDaysDisabled = this.dateHelpers.monthDisabledBefore(date, this.props);
      let isDisabled = false;
      if (allPrevDaysDisabled) {
        isDisabled = true;
      }
      const nextMonth = this.dateHelpers.subMonths(date, 1);
      const minYear = this.props.minDate ? this.dateHelpers.getYear(this.props.minDate) : MIN_YEAR;
      if (this.dateHelpers.getYear(nextMonth) < minYear) {
        isDisabled = true;
      }
      const isHidden = this.isHiddenPaginationButton(DIRECTION.PREVIOUS);
      if (isHidden) {
        isDisabled = true;
      }
      const [PrevButton, prevButtonProps] = getOverrides(overrides.PrevButton, StyledPrevButton);
      const [PrevButtonIcon, prevButtonIconProps] = getOverrides(overrides.PrevButtonIcon, theme.direction === "rtl" ? ChevronRight : ChevronLeft);
      let clickHandler = this.decreaseMonth;
      if (allPrevDaysDisabled) {
        clickHandler = null;
      }
      return <PrevButton aria-label={locale.datepicker.previousMonth} tabIndex={0} onClick={clickHandler} disabled={isDisabled} $isFocusVisible={this.state.isFocusVisible} type="button" $disabled={isDisabled} $order={this.props.order} {...prevButtonProps}>{isHidden ? null : <PrevButtonIcon size={density === DENSITY.high ? 24 : 36} overrides={{ Svg: { style: navBtnStyle } }} {...prevButtonIconProps} />}</PrevButton>;
    };
    this.renderNextMonthButton = ({ locale, theme }) => {
      const date = this.getDateProp();
      const { overrides = {}, density } = this.props;
      const allNextDaysDisabled = this.dateHelpers.monthDisabledAfter(date, this.props);
      let isDisabled = false;
      if (allNextDaysDisabled) {
        isDisabled = true;
      }
      const nextMonth = this.dateHelpers.addMonths(date, 1);
      const maxYear = this.props.maxDate ? this.dateHelpers.getYear(this.props.maxDate) : MAX_YEAR;
      if (this.dateHelpers.getYear(nextMonth) > maxYear) {
        isDisabled = true;
      }
      const isHidden = this.isHiddenPaginationButton(DIRECTION.NEXT);
      if (isHidden) {
        isDisabled = true;
      }
      const [NextButton, nextButtonProps] = getOverrides(overrides.NextButton, StyledNextButton);
      const [NextButtonIcon, nextButtonIconProps] = getOverrides(overrides.NextButtonIcon, theme.direction === "rtl" ? ChevronLeft : ChevronRight);
      let clickHandler = this.increaseMonth;
      if (allNextDaysDisabled) {
        clickHandler = null;
      }
      return <NextButton aria-label={locale.datepicker.nextMonth} tabIndex={0} onClick={clickHandler} disabled={isDisabled} type="button" $disabled={isDisabled} $isFocusVisible={this.state.isFocusVisible} $order={this.props.order} {...nextButtonProps}>{isHidden ? null : <NextButtonIcon size={density === DENSITY.high ? 24 : 36} overrides={{ Svg: { style: navBtnStyle } }} {...nextButtonIconProps} />}</NextButton>;
    };
    this.canArrowsOpenDropdown = (event) => {
      if (!this.state.isMonthDropdownOpen && !this.state.isYearDropdownOpen && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        return true;
      }
      return false;
    };
    this.renderMonthYearDropdown = () => {
      const date = this.getDateProp();
      const month = this.dateHelpers.getMonth(date);
      const year = this.dateHelpers.getYear(date);
      const { locale, overrides = {}, density } = this.props;
      const [MonthYearSelectButton, monthYearSelectButtonProps] = getOverrides(overrides.MonthYearSelectButton, StyledMonthYearSelectButton);
      const [MonthYearSelectIconContainer, monthYearSelectIconContainerProps] = getOverrides(overrides.MonthYearSelectIconContainer, StyledMonthYearSelectIconContainer);
      const [OverriddenPopover, popoverProps] = getOverrides(overrides.MonthYearSelectPopover, Popover);
      const [OverriddenStatefulMenu, menuProps] = getOverrides(overrides.MonthYearSelectStatefulMenu, StatefulMenu);
      menuProps.overrides = mergeOverrides({ List: { style: { height: "auto", maxHeight: "257px" } } }, menuProps && menuProps.overrides);
      const initialMonthIndex = this.monthItems.findIndex((month2) => {
        return month2.id === this.dateHelpers.getMonth(date).toString();
      });
      const initialYearIndex = this.yearItems.findIndex((year2) => {
        return year2.id === this.dateHelpers.getYear(date).toString();
      });
      const monthTitle = `${this.dateHelpers.getMonthInLocale(this.dateHelpers.getMonth(date), locale)}`;
      const yearTitle = `${this.dateHelpers.getYear(date)}`;
      return this.isMultiMonthHorizontal() ? <div>{`${monthTitle} ${yearTitle}`}</div> : <>
        <OverriddenPopover placement="bottom" autoFocus={true} focusLock={true} isOpen={this.state.isMonthDropdownOpen} onClick={() => {
          this.setState((prev) => {
            return {
              isMonthDropdownOpen: !prev.isMonthDropdownOpen
            };
          });
        }} onClickOutside={() => {
          return this.setState({ isMonthDropdownOpen: false });
        }} onEsc={() => {
          return this.setState({ isMonthDropdownOpen: false });
        }} content={() => {
          return <OverriddenStatefulMenu initialState={{
            highlightedIndex: initialMonthIndex,
            isFocused: true
          }} items={this.monthItems} onItemSelect={({ item, event }) => {
            event.preventDefault();
            const month2 = idToYearMonth(item.id);
            const updatedDate = this.dateHelpers.set(date, {
              year,
              month: month2
            });
            this.props.onMonthChange && this.props.onMonthChange({ date: updatedDate });
            this.setState({ isMonthDropdownOpen: false });
          }} {...menuProps} />;
        }} {...popoverProps}><MonthYearSelectButton aria-live="polite" type="button" $isFocusVisible={this.state.isFocusVisible} $density={density} onKeyUp={(event) => {
          if (this.canArrowsOpenDropdown(event)) {
            this.setState({ isMonthDropdownOpen: true });
          }
        }} onKeyDown={(event) => {
          if (this.canArrowsOpenDropdown(event)) {
            event.preventDefault();
          }
          if (event.key === "Tab") {
            this.setState({ isMonthDropdownOpen: false });
          }
        }} {...monthYearSelectButtonProps}>
          {monthTitle}
          <MonthYearSelectIconContainer {...monthYearSelectIconContainerProps}><ChevronDown title="" overrides={{ Svg: { props: { role: "presentation" } } }} size={density === DENSITY.high ? 16 : 24} /></MonthYearSelectIconContainer>
        </MonthYearSelectButton></OverriddenPopover>
        <OverriddenPopover placement="bottom" focusLock={true} isOpen={this.state.isYearDropdownOpen} onClick={() => {
          this.setState((prev) => {
            return {
              isYearDropdownOpen: !prev.isYearDropdownOpen
            };
          });
        }} onClickOutside={() => {
          return this.setState({ isYearDropdownOpen: false });
        }} onEsc={() => {
          return this.setState({ isYearDropdownOpen: false });
        }} content={() => {
          return <OverriddenStatefulMenu initialState={{
            highlightedIndex: initialYearIndex,
            isFocused: true
          }} items={this.yearItems} onItemSelect={({ item, event }) => {
            event.preventDefault();
            const year2 = idToYearMonth(item.id);
            const updatedDate = this.dateHelpers.set(date, {
              year: year2,
              month
            });
            this.props.onYearChange && this.props.onYearChange({ date: updatedDate });
            this.setState({ isYearDropdownOpen: false });
          }} {...menuProps} />;
        }} {...popoverProps}><MonthYearSelectButton aria-live="polite" type="button" $isFocusVisible={this.state.isFocusVisible} $density={density} onKeyUp={(event) => {
          if (this.canArrowsOpenDropdown(event)) {
            this.setState({ isYearDropdownOpen: true });
          }
        }} onKeyDown={(event) => {
          if (this.canArrowsOpenDropdown(event)) {
            event.preventDefault();
          }
          if (event.key === "Tab") {
            this.setState({ isYearDropdownOpen: false });
          }
        }} {...monthYearSelectButtonProps}>
          {yearTitle}
          <MonthYearSelectIconContainer {...monthYearSelectIconContainerProps}><ChevronDown title="" overrides={{ Svg: { props: { role: "presentation" } } }} size={density === DENSITY.high ? 16 : 24} /></MonthYearSelectIconContainer>
        </MonthYearSelectButton></OverriddenPopover>
      </>;
    };
    this.dateHelpers = new DateHelpers(props.adapter);
    this.monthItems = [];
    this.yearItems = [];
  }
  componentDidMount() {
    this.getYearItems();
    this.getMonthItems();
  }
  componentDidUpdate(prevProps) {
    const selectedMonthDidChange = this.dateHelpers.getMonth(this.props.date) !== this.dateHelpers.getMonth(prevProps.date);
    const selectedYearDidChange = this.dateHelpers.getYear(this.props.date) !== this.dateHelpers.getYear(prevProps.date);
    if (selectedMonthDidChange) {
      this.getYearItems();
    }
    if (selectedYearDidChange) {
      this.getMonthItems();
    }
  }
  render() {
    const { overrides = {}, density } = this.props;
    const [CalendarHeader2, calendarHeaderProps] = getOverrides(overrides.CalendarHeader, StyledCalendarHeader);
    const [MonthHeader, monthHeaderProps] = getOverrides(overrides.MonthHeader, StyledMonthHeader);
    const [WeekdayHeader, weekdayHeaderProps] = getOverrides(overrides.WeekdayHeader, StyledWeekdayHeader);
    const startOfWeek = this.dateHelpers.getStartOfWeek(this.getDateProp(), this.props.locale);
    return <ThemeContext.Consumer>{(theme) => {
      return <LocaleContext.Consumer>{(locale) => {
        return <>
          <CalendarHeader2 {...calendarHeaderProps} $density={this.props.density} onFocus={forkFocus(calendarHeaderProps, this.handleFocus)} onBlur={forkBlur(calendarHeaderProps, this.handleBlur)}>
            {this.renderPreviousMonthButton({
              locale,
              theme
            })}
            {this.renderMonthYearDropdown()}
            {this.renderNextMonthButton({ locale, theme })}
          </CalendarHeader2>
          <MonthHeader role="presentation" {...monthHeaderProps}>{WEEKDAYS.map((offset) => {
            const day = this.dateHelpers.addDays(startOfWeek, offset);
            return <WeekdayHeader key={offset} alt={this.dateHelpers.getWeekdayInLocale(day, this.props.locale)} {...weekdayHeaderProps} $density={density}>{this.dateHelpers.getWeekdayMinInLocale(day, this.props.locale)}</WeekdayHeader>;
          })}</MonthHeader>
        </>;
      }}</LocaleContext.Consumer>;
    }}</ThemeContext.Consumer>;
  }
}
CalendarHeader.defaultProps = {
  adapter: dateFnsAdapter,
  locale: null,
  maxDate: null,
  minDate: null,
  onYearChange: () => {
  },
  overrides: {}
};
