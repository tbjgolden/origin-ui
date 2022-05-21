import React from "react";
import Day from "./day";
import { StyledWeek } from "./styled-components";
import { WEEKDAYS } from "./constants";
import dateFnsAdapter from "./utils/date-fns-adapter";
import DateHelpers from "./utils/date-helpers";
import { getOverrides } from "../helpers/overrides";
export default class Week extends React.Component {
  constructor(props) {
    super(props);
    this.renderDays = () => {
      const startOfWeek = this.dateHelpers.getStartOfWeek(
        this.props.date || this.dateHelpers.date(),
        this.props.locale
      );
      const days = [];
      return days.concat(
        WEEKDAYS.map((offset) => {
          const day = this.dateHelpers.addDays(startOfWeek, offset);
          return (
            <Day
              adapter={this.props.adapter}
              date={day}
              dateLabel={this.props.dateLabel}
              density={this.props.density}
              disabled={this.dateHelpers.isDayDisabled(day, this.props)}
              excludeDates={this.props.excludeDates}
              filterDate={this.props.filterDate}
              highlightedDate={this.props.highlightedDate}
              highlighted={this.dateHelpers.isSameDay(day, this.props.highlightedDate)}
              includeDates={this.props.includeDates}
              focusedCalendar={this.props.focusedCalendar}
              range={this.props.range}
              key={offset}
              locale={this.props.locale}
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              month={this.props.month}
              onSelect={this.props.onChange}
              onBlur={this.props.onDayBlur}
              onFocus={this.props.onDayFocus}
              onClick={this.props.onDayClick}
              onMouseOver={this.props.onDayMouseOver}
              onMouseLeave={this.props.onDayMouseLeave}
              overrides={this.props.overrides}
              peekNextMonth={this.props.peekNextMonth}
              value={this.props.value}
              hasLockedBehavior={this.props.hasLockedBehavior}
              selectedInput={this.props.selectedInput}
            />
          );
        })
      );
    };
    this.dateHelpers = new DateHelpers(props.adapter);
  }
  render() {
    const { overrides = {} } = this.props;
    const [Week2, weekProps] = getOverrides(overrides.Week, StyledWeek);
    return (
      <Week2 role="row" {...weekProps}>
        {this.renderDays()}
      </Week2>
    );
  }
}
Week.defaultProps = {
  adapter: dateFnsAdapter,
  highlightedDate: null,
  onDayClick: () => {},
  onDayFocus: () => {},
  onDayBlur: () => {},
  onDayMouseOver: () => {},
  onDayMouseLeave: () => {},
  onChange: () => {},
  overrides: {},
  peekNextMonth: false,
};
