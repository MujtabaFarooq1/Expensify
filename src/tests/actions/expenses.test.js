import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense,
} from "../../actions/expenses";

import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const uid = "testUid";
const defaultAuthState = {
  auth: { uid },
};

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => {
      done();
    });
});

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

test("Should setup expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

// Datebase Test Stuff --------------------------------
test("should add expense to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
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
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

//
test("should add expense with dafault to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
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
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});

test("should fetch the expenses from firebase", (done) => {
  const store = createMockStore(defaultAuthState);

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
  });
  done();
});

test("should remove expense from database", (done) => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should  edit expense from database", (done) => {
  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = {
    amount: 12345,
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
});
