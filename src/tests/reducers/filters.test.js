import moment from "moment";
import filtersReducer from "../../reducers/filters";

test("should setup default filter value", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT_FILTER" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const curState = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "amount",
  };
  const action = { type: "SORT_BY_DATE_FILTER" };
  const state = filtersReducer(curState, action);
  expect(state.sortBy).toBe("date");
});

test("should set Text filter", () => {
  const action = { type: "SET_TEXT_FILTER", text: "Rent" };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe("Rent");
});

test("should set StartDate filter", () => {
  const action = { type: "SET_START_DATE_FILTER", date: moment(0) };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(moment(0));
});

test("should set endDate filter", () => {
  const action = {
    type: "SET_END_DATE_FILTER",
    date: moment(0).add(2, "years"),
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(moment(0).add(2, "years"));
});
