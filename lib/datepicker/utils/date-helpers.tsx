const MINUTE = 60;
const HOUR = MINUTE * 60;
class DateHelpers {
  constructor(adapter) {
    this.cloneAdapter = (adapter2, updateOptionsBase) => {
      const adapterMap = {
        MomentUtils: {
          formats: {
            monthNumber: "M",
            dayOfMonthNumber: "D",
            fullOrdinalWeek: "dddd, MMMM Do YYYY",
            slashDate: "YYYY/MM/DD",
            weekday: "dddd",
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
      const UtilsClass = adapter2.constructor;
      const className = adapter2.constructor.name;
      const { getOptions = defaultGetOptions, formats } =
        adapterMap[className] || adapterMap.DateFnsUtils;
      const options = getOptions(adapter2);
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
    this.format = (date, format, locale) => {
      const adapter2 = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
      return adapter2.format(date, format);
    };
    this.getAdapterWithNewLocale = (locale) => {
      return this.cloneAdapter(this.adapter, (options) => {
        return { ...options, locale };
      });
    };
    this.date = (date) => {
      return this.adapter.date(date);
    };
    this.dateToSeconds = (date) => {
      const seconds = this.adapter.getSeconds(date);
      const minutes = this.adapter.getMinutes(date) * MINUTE;
      const hours = this.adapter.getHours(date) * HOUR;
      return seconds + minutes + hours;
    };
    this.secondsToHourMinute = (seconds) => {
      const d = this.adapter.toJsDate(this.adapter.date(seconds * 1e3));
      return [d.getUTCHours(), d.getUTCMinutes()];
    };
    this.differenceInCalendarMonths = (fromDate, toDate) => {
      const yearDiff = this.adapter.getYear(fromDate) - this.adapter.getYear(toDate);
      const monthDiff = this.adapter.getMonth(fromDate) - this.adapter.getMonth(toDate);
      return yearDiff * 12 + monthDiff;
    };
    this.getStartOfWeek = (date, locale) => {
      const adapter2 = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
      return adapter2.startOfWeek(adapter2.date(date));
    };
    this.formatDate = (date, formatString, locale) => {
      const adapter2 = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
      return adapter2.formatByString(date, formatString);
    };
    this.getWeekdayMinInLocale = (date, locale) => {
      return this.getAdapterWithNewLocale(locale).format(date, "weekdaymin");
    };
    this.getMonthInLocale = (monthNumber, locale) => {
      const localeAdapter = this.getAdapterWithNewLocale(locale);
      return localeAdapter.format(
        localeAdapter.setMonth(localeAdapter.date(), monthNumber),
        "month"
      );
    };
    this.getWeekdayInLocale = (date, locale) => {
      return this.getAdapterWithNewLocale(locale).format(date, "weekday");
    };
    this.getQuarterInLocale = (quarterNumber, locale) => {
      const localeAdapter = this.getAdapterWithNewLocale(locale);
      return localeAdapter.format(
        localeAdapter.setMonth(localeAdapter.date(), quarterNumber * 3),
        "quarter"
      );
    };
    this.getEndOfWeek = (date) => {
      return this.adapter.endOfWeek(date);
    };
    this.getDay = (date) => {
      return Number(this.adapter.formatByString(date, "e")) - 1;
    };
    this.addWeeks = (date, weekNumber) => {
      return this.adapter.addDays(date, weekNumber * 7);
    };
    this.subWeeks = (date, weekNumber) => {
      return this.addWeeks(date, weekNumber * -1);
    };
    this.addYears = (date, yearNumber) => {
      return this.adapter.addMonths(date, yearNumber * 12);
    };
    this.subYears = (date, yearNumber) => {
      return this.addYears(date, yearNumber * -1);
    };
    this.isSameYear = (fromDate, toDate) => {
      if (fromDate && toDate) {
        return this.adapter.isSameYear(fromDate, toDate);
      }
      return false;
    };
    this.isStartOfMonth = (date) => {
      return this.adapter.isSameDay(date, this.adapter.startOfMonth(date));
    };
    this.isEndOfMonth = (date) => {
      return this.adapter.isSameDay(date, this.adapter.endOfMonth(date));
    };
    this.isDayInRange = (date, startDate, endDate) => {
      return this.adapter.isWithinRange(date, [startDate, endDate]);
    };
    this.isSameDay = (fromDate, toDate) => {
      if (fromDate && toDate) {
        return this.adapter.isSameDay(fromDate, toDate);
      }
      return false;
    };
    this.isSameMonth = (fromDate, toDate) => {
      if (fromDate && toDate) {
        return this.adapter.isSameMonth(fromDate, toDate);
      }
      return false;
    };
    this.dateRangeIncludesDates = (dateRange, dates) => {
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
    this.subDays = (date, days) => {
      return this.adapter.addDays(date, days * -1);
    };
    this.subMonths = (date, months) => {
      return this.adapter.addMonths(date, months * -1);
    };
    this.min = (dates) => {
      return dates.reduce((minDate, date) => {
        return this.adapter.isBefore(date, minDate) ? date : minDate;
      });
    };
    this.max = (dates) => {
      return dates.reduce((maxDate, date) => {
        return this.adapter.isAfter(date, maxDate) ? date : maxDate;
      });
    };
    this.getEffectiveMinDate = ({ minDate, includeDates }) => {
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
      return this.adapter.date();
    };
    this.getEffectiveMaxDate = ({ maxDate, includeDates }) => {
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
      return this.adapter.date();
    };
    this.monthDisabledBefore = (day, { minDate, includeDates } = {}) => {
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
    this.monthDisabledAfter = (day, { maxDate, includeDates } = {}) => {
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
    this.setDate = (date, dayNumber) => {
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
    this.getDate = (date) => {
      return Number(this.adapter.format(date, "dayOfMonthNumber"));
    };
    this.applyDateToTime = (time, date) => {
      if (!time) return date;
      const yearNumber = this.adapter.getYear(date);
      const monthNumber = this.adapter.getMonth(date);
      const dayNumber = this.getDate(date);
      const yearDate = this.adapter.setYear(time, yearNumber);
      const monthDate = this.adapter.setMonth(yearDate, monthNumber);
      return this.setDate(monthDate, dayNumber);
    };
    this.applyTimeToDate = (date, time) => {
      if (!date) return time;
      return this.adapter.setSeconds(this.adapter.mergeDateAndTime(date, time), 0);
    };
    this.isDayDisabled = (
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
    this.isOnOrAfterDay = (fromDate, toDate) => {
      if (this.adapter.isSameDay(fromDate, toDate)) {
        return true;
      }
      return this.adapter.isAfter(fromDate, toDate);
    };
    this.isOnOrBeforeDay = (fromDate, toDate) => {
      if (this.adapter.isSameDay(fromDate, toDate)) {
        return true;
      }
      return this.adapter.isBefore(fromDate, toDate);
    };
    this.isOutOfBounds = (day, { minDate, maxDate } = {}) => {
      return (
        (!!minDate && !this.isOnOrAfterDay(day, minDate)) ||
        (!!maxDate && !this.isOnOrBeforeDay(day, maxDate))
      );
    };
    this.parseString = (string, formatString, locale) => {
      const adapter2 = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
      return adapter2.parse(string, formatString);
    };
    this.parse = (string, format, locale) => {
      const adapter2 = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
      return adapter2.parse(string, adapter2.formats[format]);
    };
    this.setMilliseconds = (date, milliseconds) => {
      return this.adapter.date(
        this.adapter.getSeconds(this.adapter.startOfDay(date)) * 1e3 + milliseconds
      );
    };
    this.set = (date, values) => {
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
    this.getQuarter = (date) => {
      return Math.floor(this.getMonth(date) / 3) + 1;
    };
    this.setSeconds = (date, seconds) => {
      return this.adapter.setSeconds(date, seconds);
    };
    this.setMinutes = (date, minutes) => {
      return this.adapter.setMinutes(date, minutes);
    };
    this.setHours = (date, hours) => {
      return this.adapter.setHours(date, hours);
    };
    this.setMonth = (date, monthNumber) => {
      return this.adapter.setMonth(date, monthNumber);
    };
    this.setYear = (date, yearNumber) => {
      return this.adapter.setYear(date, yearNumber);
    };
    this.getMinutes = (date) => {
      return this.adapter.getMinutes(date);
    };
    this.getHours = (date) => {
      return this.adapter.getHours(date);
    };
    this.getMonth = (date) => {
      return this.adapter.getMonth(date);
    };
    this.getYear = (date) => {
      return this.adapter.getYear(date);
    };
    this.getStartOfMonth = (date) => {
      return this.adapter.startOfMonth(date);
    };
    this.getEndOfMonth = (date) => {
      return this.adapter.endOfMonth(date);
    };
    this.addDays = (date, days) => {
      return this.adapter.addDays(date, days);
    };
    this.addMonths = (date, months) => {
      return this.adapter.addMonths(date, months);
    };
    this.isBefore = (fromDate, toDate) => {
      return this.adapter.isBefore(fromDate, toDate);
    };
    this.isAfter = (fromDate, toDate) => {
      return this.adapter.isAfter(fromDate, toDate);
    };
    this.isEqual = (fromDate, toDate) => {
      return this.adapter.isEqual(fromDate, toDate);
    };
    this.isValid = (possibleDate) => {
      return this.adapter.isValid(possibleDate);
    };
    this.adapter = this.cloneAdapter(adapter);
  }
}
export default DateHelpers;
