import selectExpenseTotal from "../../selectors/expense-total";
import expenses from "../fixtures/expenses";

test("should return 0 in case of no expense", () => {
  const res = selectExpenseTotal([]);
  expect(res).toBe(0);
});

test("should return expense value in case of only one expense", () => {
  const res = selectExpenseTotal([expenses[1]]);
  expect(res).toBe(expenses[1].amount);
});

test("should corrctly sum up expenses amount", () => {
  const res = selectExpenseTotal(expenses);
  const finalRes = expenses[0].amount + expenses[1].amount + expenses[2].amount;
  expect(res).toBe(finalRes);
});
