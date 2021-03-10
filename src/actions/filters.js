// Set Test Filter
export const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// Sort By Amount Filter
export const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT_FILTER",
});

// Sort By Date Filter
export const sortByDate = () => ({
  type: "SORT_BY_DATE_FILTER",
});

// Set StartDate Filter
export const setStartDate = (date) => ({
  type: "SET_START_DATE_FILTER",
  date,
});

// Set EndDate Filter
export const setEndDate = (date) => ({
  type: "SET_END_DATE_FILTER",
  date,
});
