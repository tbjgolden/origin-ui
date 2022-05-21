import { DEFAULT_MONTHS } from "../constants";
const getDefaultMonthItems = (formatMonthLabel) => {
  return DEFAULT_MONTHS.map((month) => {
    return {
      id: month.toString(),
      label: formatMonthLabel(month),
    };
  });
};
export const filterMonthItems = (monthItems, filterList) => {
  return monthItems.map((month) => {
    if (!filterList.includes(Number(month.id))) {
      return {
        ...month,
        disabled: true,
      };
    }
    return month;
  });
};
export const getFilteredMonthItems = ({ filterMonthsList, formatMonthLabel }) => {
  let monthItems = getDefaultMonthItems(formatMonthLabel);
  if (filterMonthsList) {
    monthItems = filterMonthItems(monthItems, filterMonthsList);
  }
  return monthItems;
};
