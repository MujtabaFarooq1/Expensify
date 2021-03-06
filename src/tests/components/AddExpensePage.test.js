import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let startAddExpense, history, wrapper;

// this piece of code runs before each test case
beforeEach(() => {
  startAddExpense = jest.fn();
  history = {
    push: jest.fn(),
  };
  wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
});

test("should render add expense page correcly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit correctly", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
