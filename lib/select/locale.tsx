export type SelectLocaleT = {
  // Remove noResultsMsg prop in the next major version
  noResultsMsg: string;
  placeholder: string;
  create: string;
};

const locale = {
  // Remove noResultsMsg prop in the next major version
  noResultsMsg: "No results found",
  placeholder: "Select...",
  create: "Create",
};

export default locale;
