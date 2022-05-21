import type { NavItemT } from "./types";

type GetUniqueIdentifierT = (NavItemT) => string | number;

export function defaultMapItemToNode(item: NavItemT) {
  if (__DEV__ && !item.label) {
    throw new Error(
      "There needs to be an unique item.label. You can implement a custom mapping with the mapItemToNode prop."
    );
  }
  return item.label;
}

function defaultGetUniqueIdentifier(item: NavItemT) {
  if (__DEV__ && !item.label) {
    throw new Error(
      "There needs to be an unique item.label. You can implement a custom mapping with the getUniqueIdentifier argument to setItemActive."
    );
  }
  return item.label;
}

export function mapItemsActive(items: NavItemT[], predicate: (NavItemT) => boolean) {
  return items.map<NavItemT>((current) => {
    current.active = predicate(current) ? true : false;

    if (current.children) {
      current.children = mapItemsActive(current.children, predicate);
      if (
        current.children.some((child) => {
          return child.active;
        })
      ) {
        current.active = true;
      }
    }

    return current;
  });
}

export function setItemActive(
  items: NavItemT[],
  item: NavItemT,
  getUniqueIdentifier?: GetUniqueIdentifierT = defaultGetUniqueIdentifier
) {
  return mapItemsActive(items, (current) => {
    return getUniqueIdentifier(current) === getUniqueIdentifier(item);
  });
}
