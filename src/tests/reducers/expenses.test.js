import moment from "moment";
import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense with id", () => {
  const action = { type: "REMOVE_EXPENSE", id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
  const action = { type: "REMOVE_EXPENSE", id: -1 };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("To add expenses", () => {
  const expense = {
    id: 3,
    description: "Test Expense",
    note: "",
    amount: 6087,
    createdAt: moment(0).add(3, "days").valueOf(),
  };
  const action = { type: "ADD_EXPENSE", expense };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("To Edit expenses with updates", () => {
  const updates = {
    id: 0,
    description: "Gum Edited",
    note: "",
    amount: 287,
    createdAt: 0,
  };
  const action = { type: "EDIT_EXPENSE", updates, id: 0 };

  const state = expensesReducer(expenses, action);
  expect(state[0]).toEqual(updates);
});

test("Don't Edit expenses with invalid Id", () => {
  const updates = {
    id: -1,
    description: "Gum Edited",
    note: "",
    amout: 287,
    createdAt: 0,
  };
  const action = { type: "EDIT_EXPENSE", updates, id: -1 };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
