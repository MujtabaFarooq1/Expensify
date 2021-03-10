import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

//Remove Expense Test Case
test("Should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

//Edit Expense Test Case
test("Should setup edit expense action object", () => {
  const action = editExpense("123abc", {
    amount: 10,
    description: "for test case",
  });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: { amount: 10, description: "for test case" },
  });
});

// Add Expense Test Case
test("Should setup add expense action object with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 10,
    createdAt: 1000,
    note: "This Was Last Months Rent",
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: { ...expenseData, id: expect.any(String) },
  });
});

test("Should setup add expense action object with No values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      amount: 0,
      createdAt: 0,
      note: "",
      id: expect.any(String),
    },
  });
});
