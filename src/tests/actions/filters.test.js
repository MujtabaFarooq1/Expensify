import moment from "moment";
import {
  setEndDate,
  setStartDate,
  setTextFilter,
  sortByAmount,
  sortByDate,
} from "../../actions/filters";

test("Set The Text Filter with provided values", () => {
  const text = "Rent";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text,
  });
});

test("Set The Text Filter with no values", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  });
});

test("Set Start Date Action Object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE_FILTER",
    date: moment(0),
  });
});

test("Set End Date Action Object", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE_FILTER",
    date: moment(0),
  });
});

test("Set to sortByAmount", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT_FILTER",
  });
});

test("Set to sortByDate", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE_FILTER",
  });
});
