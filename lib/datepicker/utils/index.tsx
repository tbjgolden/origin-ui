import defaultAdapter from "./date-fns-adapter";
import DateHelpers from "./date-helpers";
const defaultDateHelpers = new DateHelpers(defaultAdapter);
const { date: wrapDate } = defaultAdapter;
export const formatDate = defaultDateHelpers.formatDate;
export const getStartOfWeek = defaultDateHelpers.getStartOfWeek;
export const getEndOfWeek = defaultDateHelpers.getEndOfWeek;
export const getStartOfMonth = defaultDateHelpers.getStartOfMonth;
export const getEndOfMonth = defaultDateHelpers.getEndOfMonth;
export const isSameYear = defaultDateHelpers.isSameYear;
export const isSameMonth = defaultDateHelpers.isSameMonth;
export const isSameDay = defaultDateHelpers.isSameDay;
export const isDayInRange = defaultDateHelpers.isDayInRange;
export const isStartOfMonth = defaultDateHelpers.isStartOfMonth;
export const isEndOfMonth = defaultDateHelpers.isEndOfMonth;
export const getWeekdayMinInLocale = defaultDateHelpers.getWeekdayMinInLocale;
export const getWeekdayInLocale = defaultDateHelpers.getWeekdayInLocale;
export const getMonthInLocale = defaultDateHelpers.getMonthInLocale;
export const getQuarterInLocale = defaultDateHelpers.getQuarterInLocale;
export const isDayDisabled = defaultDateHelpers.isDayDisabled;
export const isOutOfBounds = defaultDateHelpers.isOutOfBounds;
export const monthDisabledBefore = defaultDateHelpers.monthDisabledBefore;
export const monthDisabledAfter = defaultDateHelpers.monthDisabledAfter;
export const getEffectiveMinDate = defaultDateHelpers.getEffectiveMinDate;
export const getEffectiveMaxDate = defaultDateHelpers.getEffectiveMaxDate;
export const applyTimeToDate = defaultDateHelpers.applyTimeToDate;
export const applyDateToTime = defaultDateHelpers.applyDateToTime;
const createDirtySetter = (setter) => {
  return (dirtyDate, number) => {
    return setter(wrapDate(dirtyDate), number);
  };
};
const createDirtyGetter = (getter) => {
  return (dirtyDate) => {
    return getter(wrapDate(dirtyDate));
  };
};
const createDirtyCompare = (compare) => {
  return (fromDirty, toDirty) => {
    return compare(wrapDate(fromDirty), wrapDate(toDirty));
  };
};
export const setSeconds = createDirtySetter(defaultDateHelpers.setSeconds);
export const setMinutes = createDirtySetter(defaultDateHelpers.setMinutes);
export const setHours = createDirtySetter(defaultDateHelpers.setHours);
export const setMonth = createDirtySetter(defaultDateHelpers.setMonth);
export const setYear = createDirtySetter(defaultDateHelpers.setYear);
export const getMinutes = createDirtyGetter(defaultDateHelpers.getMinutes);
export const getHours = createDirtyGetter(defaultDateHelpers.getHours);
export const getDate = createDirtyGetter(defaultDateHelpers.getDate);
export const getMonth = createDirtyGetter(defaultDateHelpers.getMonth);
export const getYear = createDirtyGetter(defaultDateHelpers.getYear);
export const addDays = createDirtySetter(defaultDateHelpers.addDays);
export const addWeeks = createDirtySetter(defaultDateHelpers.addWeeks);
export const addMonths = createDirtySetter(defaultDateHelpers.addMonths);
export const addYears = createDirtySetter(defaultDateHelpers.addYears);
export const subDays = createDirtySetter(defaultDateHelpers.subDays);
export const subWeeks = createDirtySetter(defaultDateHelpers.subWeeks);
export const subMonths = createDirtySetter(defaultDateHelpers.subMonths);
export const subYears = createDirtySetter(defaultDateHelpers.subYears);
export const isBefore = createDirtyCompare(defaultDateHelpers.isBefore);
export const isAfter = createDirtyCompare(defaultDateHelpers.isAfter);
export const format = (date, format2, locale) => {
  return defaultDateHelpers.format(date, format2, locale);
};
