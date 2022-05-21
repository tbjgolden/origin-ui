import type { DateIOAdapter, DateInput, AdapterOptions } from "./types";

const MINUTE = 60;
const HOUR = MINUTE * 60;

class DateHelpers<T> {
  adapter: DateIOAdapter<T>;
  constructor(adapter: DateIOAdapter<T>) {
    this.adapter = this.cloneAdapter(adapter);
  }
  cloneAdapter = (
    adapter: DateIOAdapter<T>,
    updateOptionsBase?: (x: AdapterOptions) => AdapterOptions
  ): DateIOAdapter<T> => {
    const adapterMap = {
      // all utils classes set the arguments passed into their constructor as public members in some way
      // it just varies by class, most just set formats and locale, but this handles the exceptions
      MomentUtils: {
        formats: {
          monthNumber: "M",
          dayOfMonthNumber: "D",
          fullOrdinalWeek: "dddd, MMMM Do YYYY",
          slashDate: "YYYY/MM/DD",
          weekday: "dddd",
          // moment does not have a similar 'single character' weekday format like the other libraries
          // the format below will only supply two character abbreviations.
          weekdaymin: "dd",
          quarter: "[Q]Q",
        },
      },
      DateFnsUtils: {
        formats: {
          monthNumber: "M",
          dayOfMonthNumber: "d",
          weekday: "EEEE",
          weekdaymin: "EEEEEE",
          slashDate: "yyyy/MM/dd",
          fullOrdinalWeek: "EEEE, MMMM do yyyy",
          quarter: "QQQ",
        },
      },
      LuxonUtils: {
        formats: {
          monthNumber: "M",
          dayOfMonthNumber: "d",
          weekday: "EEEE",
          weekdaymin: "EEEEE",
          slashDate: "yyyy/MM/dd",
          fullOrdinalWeek: "EEEE, MMMM dd yyyy",
          quarter: "Qq",
        },
      },
    };
    const defaultGetOptions = (instance) => {
      return {
        formats: instance.formats,
        locale: instance.locale,
      };
    };
    const updateOptions = updateOptionsBase || defaultGetOptions;
    const UtilsClass = adapter.constructor;
    const className = adapter.constructor.name;
    // This ensures that if the adapter class isn't
    // supported it just falls back the default formats

    // NOTE: in e2e tests playwright seems to add
    // a JSHandle wrapping class to all objects
    // so className always resolves to JSHandle:e
    // and if falls back to the default
    // if we want to test other adapter implementation
    // in e2e tests down the road, we're going to have
    // to figure that out
    const { getOptions = defaultGetOptions, formats } =
      adapterMap[className] || adapterMap.DateFnsUtils;
    const options = getOptions(adapter);
    return new UtilsClass(
      Object.assign(
        {},
        updateOptions(
          Object.assign({}, options, {
            formats: Object.assign({}, options.formats, formats),
          })
        )
      )
    );
  };
  format = (date, format, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;

    return adapter.format(date, format);
  };
  getAdapterWithNewLocale = (locale) => {
    return this.cloneAdapter(this.adapter, (options) => {
      return { ...options, locale };
    });
  };
  date = (date) => {
    return this.adapter.date(date);
  };
  dateToSeconds = (date) => {
    const seconds = this.adapter.getSeconds(date);
    const minutes = this.adapter.getMinutes(date) * MINUTE;
    const hours = this.adapter.getHours(date) * HOUR;
    return seconds + minutes + hours;
  };
  secondsToHourMinute = (seconds) => {
    const d = this.adapter.toJsDate(this.adapter.date(seconds * 1000));
    return [d.getUTCHours(), d.getUTCMinutes()];
  };
  differenceInCalendarMonths = (fromDate, toDate) => {
    const yearDiff = this.adapter.getYear(fromDate) - this.adapter.getYear(toDate);
    const monthDiff = this.adapter.getMonth(fromDate) - this.adapter.getMonth(toDate);
    return yearDiff * 12 + monthDiff;
  };
  getStartOfWeek = (date, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
    // rewrapping this date here ensures that the locale will be taken into account in all adapters
    return adapter.startOfWeek(adapter.date(date));
  };
  formatDate = (date, formatString, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
    return adapter.formatByString(date, formatString);
  };
  getWeekdayMinInLocale = (date, locale) => {
    return this.getAdapterWithNewLocale(locale).format(date, "weekdaymin");
  };
  getMonthInLocale = (monthNumber, locale) => {
    const localeAdapter = this.getAdapterWithNewLocale(locale);
    return localeAdapter.format(
      localeAdapter.setMonth(localeAdapter.date(), monthNumber),
      "month"
    );
  };
  getWeekdayInLocale = (date, locale) => {
    return this.getAdapterWithNewLocale(locale).format(date, "weekday");
  };
  getQuarterInLocale = (quarterNumber, locale) => {
    const localeAdapter = this.getAdapterWithNewLocale(locale);
    return localeAdapter.format(
      localeAdapter.setMonth(localeAdapter.date(), quarterNumber * 3),
      "quarter"
    );
  };
  getEndOfWeek = (date) => {
    return this.adapter.endOfWeek(date);
  };
  getDay = (date) => {
    return Number(this.adapter.formatByString(date, "e")) - 1;
  };
  addWeeks = (date, weekNumber) => {
    return this.adapter.addDays(date, weekNumber * 7);
  };
  subWeeks = (date, weekNumber) => {
    return this.addWeeks(date, weekNumber * -1);
  };
  addYears = (date, yearNumber) => {
    return this.adapter.addMonths(date, yearNumber * 12);
  };
  subYears = (date, yearNumber) => {
    return this.addYears(date, yearNumber * -1);
  };
  isSameYear = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameYear(fromDate, toDate);
    }
    return false;
  };
  isStartOfMonth = (date) => {
    return this.adapter.isSameDay(date, this.adapter.startOfMonth(date));
  };
  isEndOfMonth = (date) => {
    return this.adapter.isSameDay(date, this.adapter.endOfMonth(date));
  };
  isDayInRange = (date, startDate, endDate) => {
    return this.adapter.isWithinRange(date, [startDate, endDate]);
  };
  isSameDay = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameDay(fromDate, toDate);
    }
    return false;
  };
  isSameMonth = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameMonth(fromDate, toDate);
    }
    return false;
  };
  dateRangeIncludesDates = (dateRange, dates) => {
    const [startDate, endDate] = dateRange;
    if (startDate && endDate && Array.isArray(dates) && dates.length > 0) {
      for (const day of dates) {
        if (this.isDayInRange(day, startDate, endDate)) {
          return true;
        }
      }
    }
    return false;
  };
  subDays = (date, days) => {
    return this.adapter.addDays(date, days * -1);
  };
  subMonths = (date, months) => {
    return this.adapter.addMonths(date, months * -1);
  };
  min = (dates) => {
    return dates.reduce((minDate, date) => {
      return this.adapter.isBefore(date, minDate) ? date : minDate;
    });
  };
  max = (dates) => {
    return dates.reduce((maxDate, date) => {
      return this.adapter.isAfter(date, maxDate) ? date : maxDate;
    });
  };
  getEffectiveMinDate = ({ minDate, includeDates }) => {
    if (includeDates && minDate) {
      const minDates = includeDates.filter((includeDate) => {
        return this.isOnOrAfterDay(includeDate, minDate);
      });
      return this.min(minDates);
    } else if (includeDates && includeDates.length > 0) {
      return this.min(includeDates);
    } else if (!(includeDates && includeDates.length > 0) && minDate) {
      return minDate;
    }
    // this condition can't ever be reached
    // but flow isn't smart enough to see that all of the conditions are covered
    return this.adapter.date();
  };
  getEffectiveMaxDate = ({ maxDate, includeDates }) => {
    if (includeDates && maxDate) {
      const maxDates = includeDates.filter((includeDate) => {
        return this.isOnOrBeforeDay(includeDate, maxDate);
      });
      return this.max(maxDates);
    } else if (includeDates) {
      return this.max(includeDates);
    } else if (!includeDates && maxDate) {
      return maxDate;
    }
    // this condition can't ever be reached
    // but flow isn't smart enough to see that all of the conditions are covered
    return this.adapter.date();
  };
  monthDisabledBefore = (day, { minDate, includeDates } = {}) => {
    const previousMonth = this.subMonths(day, 1);
    return (
      (!!minDate && this.differenceInCalendarMonths(minDate, previousMonth) > 0) ||
      (!!includeDates &&
        includeDates.every((includeDate) => {
          return this.differenceInCalendarMonths(includeDate, previousMonth) > 0;
        })) ||
      false
    );
  };
  monthDisabledAfter = (day, { maxDate, includeDates } = {}) => {
    const nextMonth = this.adapter.addMonths(day, 1);
    return (
      (!!maxDate && this.differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
      (!!includeDates &&
        includeDates.every((includeDate) => {
          return this.differenceInCalendarMonths(nextMonth, includeDate) > 0;
        })) ||
      false
    );
  };
  setDate = (date, dayNumber) => {
    const startOfMonthNoTime = this.adapter.startOfMonth(date);
    const startOfMonthHoursAndMinutes = this.adapter.mergeDateAndTime(
      startOfMonthNoTime,
      date
    );
    const startOfMonth = this.adapter.setSeconds(
      startOfMonthHoursAndMinutes,
      this.adapter.getSeconds(date)
    );
    return this.adapter.addDays(startOfMonth, dayNumber - 1);
  };
  getDate = (date) => {
    return Number(this.adapter.format(date, "dayOfMonthNumber"));
  };
  applyDateToTime = (time, date) => {
    if (!time) return date;
    const yearNumber = this.adapter.getYear(date);
    const monthNumber = this.adapter.getMonth(date);
    const dayNumber = this.getDate(date);
    const yearDate = this.adapter.setYear(time, yearNumber);
    const monthDate = this.adapter.setMonth(yearDate, monthNumber);
    return this.setDate(monthDate, dayNumber);
  };
  applyTimeToDate = (date, time) => {
    if (!date) return time;
    return this.adapter.setSeconds(this.adapter.mergeDateAndTime(date, time), 0);
  };
  isDayDisabled = (
    day,
    { minDate, maxDate, excludeDates, includeDates, filterDate } = {}
  ) => {
    return (
      this.isOutOfBounds(day, { minDate, maxDate }) ||
      (excludeDates &&
        excludeDates.some((excludeDate) => {
          return this.adapter.isSameDay(day, excludeDate);
        })) ||
      (includeDates &&
        !includeDates.some((includeDate) => {
          return this.adapter.isSameDay(day, includeDate);
        })) ||
      (filterDate && !filterDate(day)) ||
      false
    );
  };
  //Tue Apr 12 2011 00:00:00 GMT-0500, Tue Apr 12 2011 11:21:31 GMT-0500
  isOnOrAfterDay = (fromDate, toDate) => {
    if (this.adapter.isSameDay(fromDate, toDate)) {
      return true;
    }
    return this.adapter.isAfter(fromDate, toDate);
  };
  isOnOrBeforeDay = (fromDate, toDate) => {
    if (this.adapter.isSameDay(fromDate, toDate)) {
      return true;
    }
    return this.adapter.isBefore(fromDate, toDate);
  };
  isOutOfBounds = (day, { minDate, maxDate } = {}) => {
    return (
      (!!minDate && !this.isOnOrAfterDay(day, minDate)) ||
      (!!maxDate && !this.isOnOrBeforeDay(day, maxDate))
    );
  };
  parseString = (string, formatString, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;

    return adapter.parse(string, formatString);
  };
  parse = (string, format, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;

    return adapter.parse(string, adapter.formats[format]);
  };
  setMilliseconds: (T, number) => T = (date, milliseconds) => {
    return this.adapter.date(
      this.adapter.getSeconds(this.adapter.startOfDay(date)) * 1000 + milliseconds
    );
  };
  set: (
    T,
    values: {
      year?: number;
      date?: number;
      month?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    }
  ) => T = (date, values) => {
    let updatedDate = date;
    if (values.year != null) {
      updatedDate = this.setYear(updatedDate, values.year);
    }

    if (values.month != null) {
      updatedDate = this.setMonth(updatedDate, values.month);
    }

    if (values.date != null) {
      updatedDate = this.setDate(updatedDate, Number(values.date));
    }

    if (values.hours != null) {
      updatedDate = this.setHours(updatedDate, Number(values.hours));
    }

    if (values.minutes != null) {
      updatedDate = this.setMinutes(updatedDate, Number(values.minutes));
    }

    if (values.seconds != null) {
      updatedDate = this.setSeconds(updatedDate, Number(values.seconds));
    }

    return updatedDate;
  };
  getQuarter: (T) => number = (date) => {
    return Math.floor(this.getMonth(date) / 3) + 1;
  };
  setSeconds: (T, number) => T = (date, seconds) => {
    return this.adapter.setSeconds(date, seconds);
  };
  setMinutes: (T, number) => T = (date, minutes) => {
    return this.adapter.setMinutes(date, minutes);
  };
  setHours: (T, number) => T = (date, hours) => {
    return this.adapter.setHours(date, hours);
  };
  setMonth: (T, number) => T = (date, monthNumber) => {
    return this.adapter.setMonth(date, monthNumber);
  };
  setYear: (T, number) => T = (date, yearNumber) => {
    return this.adapter.setYear(date, yearNumber);
  };
  getMinutes: (T) => number = (date) => {
    return this.adapter.getMinutes(date);
  };
  getHours: (T) => number = (date) => {
    return this.adapter.getHours(date);
  };
  getMonth: (T) => number = (date) => {
    return this.adapter.getMonth(date);
  };
  getYear: (T) => number = (date) => {
    return this.adapter.getYear(date);
  };
  getStartOfMonth: (T) => T = (date) => {
    return this.adapter.startOfMonth(date);
  };
  getEndOfMonth: (T) => T = (date) => {
    return this.adapter.endOfMonth(date);
  };
  addDays: (T, number) => T = (date, days) => {
    return this.adapter.addDays(date, days);
  };
  addMonths: (T, number) => T = (date, months) => {
    return this.adapter.addMonths(date, months);
  };
  isBefore = (fromDate, toDate) => {
    return this.adapter.isBefore(fromDate, toDate);
  };
  isAfter = (fromDate, toDate) => {
    return this.adapter.isAfter(fromDate, toDate);
  };
  isEqual = (fromDate, toDate) => {
    return this.adapter.isEqual(fromDate, toDate);
  };
  isValid: (mixed) => boolean = (possibleDate) => {
    return this.adapter.isValid(possibleDate);
  };
}

export default DateHelpers;
