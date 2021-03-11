import React from "react";
import { shallow } from "enzyme";
import { ExpenseSummary } from "../../components/ExpenseSummary";
import expenses from "../fixtures/expenses";

test("should render summary with one expense", () => {
  const wrapper = shallow(
    <ExpenseSummary expensesCount={1} expensesTotal={expenses[1].amount} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render summary with more or no expenses", () => {
  const wrapper = shallow(
    <ExpenseSummary
      expensesCount={3}
      expensesTotal={
        expenses[0].amount + expenses[1].amount + expenses[2].amount
      }
    />
  );
  expect(wrapper).toMatchSnapshot();
});
