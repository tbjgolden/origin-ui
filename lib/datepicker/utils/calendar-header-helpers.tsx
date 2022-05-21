
import { DEFAULT_MONTHS } from "../constants.js";

export type OptionT = {
  id: string,
  label: string,
  disabled?: boolean,
};

type GetMonthItemsArgsT = {
  filterMonthsList: number[] | null,
  formatMonthLabel: (number) => string,
};

const getDefaultMonthItems = (formatMonthLabel: (number) => string) =>
  DEFAULT_MONTHS.map<OptionT>((month) => ({
    id: month.toString(),
    label: formatMonthLabel(month),
  }));

export const filterMonthItems = (monthItems: OptionT[], filterList: number[]) =>
  monthItems.map<OptionT>((month) => {
    if (!filterList.includes(Number(month.id))) {
      return {
        ...month,
        disabled: true,
      };
    }
    return month;
  });

export const getFilteredMonthItems = ({
  filterMonthsList,
  formatMonthLabel,
}: GetMonthItemsArgsT) => {
  let monthItems = getDefaultMonthItems(formatMonthLabel);

  if (filterMonthsList) {
    monthItems = filterMonthItems(monthItems, filterMonthsList);
  }

  return monthItems;
};
