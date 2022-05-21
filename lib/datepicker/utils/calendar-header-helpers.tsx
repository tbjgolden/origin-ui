import { DEFAULT_MONTHS } from "../constants";

export type OptionT = {
  id: string;
  label: string;
  disabled?: boolean;
};

type GetMonthItemsArgsT = {
  filterMonthsList: number[] | null;
  formatMonthLabel: (number) => string;
};

const getDefaultMonthItems = (formatMonthLabel: (number) => string) => {
  return DEFAULT_MONTHS.map<OptionT>((month) => {
    return {
      id: month.toString(),
      label: formatMonthLabel(month),
    };
  });
};

export const filterMonthItems = (monthItems: OptionT[], filterList: number[]) => {
  return monthItems.map<OptionT>((month) => {
    if (!filterList.includes(Number(month.id))) {
      return {
        ...month,
        disabled: true,
      };
    }
    return month;
  });
};

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
