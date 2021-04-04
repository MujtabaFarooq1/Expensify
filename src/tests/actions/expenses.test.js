import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import databse from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

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
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[1],
  });
});

//
test("should add expense to databse and store", (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: "Mouse",
    amount: 344,
    note: "this is better",
    createdAt: 1000,
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });
      return databse.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

//
test("should add expense with dafault to databse and store", () => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults,
        },
      });
      return databse.ref(`expenses/${actions[0].expense.id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

// test("Should setup add expense action object with No values", () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       description: "",
//       amount: 0,
//       createdAt: 0,
//       note: "",
//       id: expect.any(String),
//     },
//   });
// });
