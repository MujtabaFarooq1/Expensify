import { createStore, combineReducers } from "redux";
import { v1 as uuidv1 } from "uuid";

// ------------ EXPENSES FUNCTIONS ------------ //

// Add expense
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuidv1(),
    description,
    note,
    amount,
    createdAt,
  },
});

// Remove Expense
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// Edit Expense
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// ------------ Filter FUNCTIONS ------------ //

// Set Test Filter
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// Sort By Amount Filter
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT_FILTER",
});

// Sort By Date Filter
const sortByDate = () => ({
  type: "SORT_BY_DATE_FILTER",
});

// Set StartDate Filter
const setStartDate = (date) => ({
  type: "SET_START_DATE_FILTER",
  date,
});

// Set EndDate Filter
const setEndDate = (date) => ({
  type: "SET_END_DATE_FILTER",
  date,
});

// Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id != action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });

    default:
      return state;
  }
};

// Fileters Reducer
const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SORT_BY_AMOUNT_FILTER":
      return { ...state, sortBy: "amount" };
    case "SORT_BY_DATE_FILTER":
      return { ...state, sortBy: "date" };
    case "SET_START_DATE_FILTER":
      return { ...state, startDate: action.date };
    case "SET_END_DATE_FILTER":
      return { ...state, endDate: action.date };
    default:
      return state;
  }
};

// Get visible Expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store Creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer,
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const ex1 = store.dispatch(
  addExpense({ description: "Rent For House", amount: 90, createdAt: -21000 })
);
const ex2 = store.dispatch(
  addExpense({ description: "Rent For Office", amount: 60, createdAt: -1000 })
);

// store.dispatch(removeExpense({ id: ex1.expense.id }));

// store.dispatch(editExpense(ex2.expense.id, { amount: 800 }));

//store.dispatch(setTextFilter("Offic"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(0));
//store.dispatch(setEndDate(1000));
// store.dispatch(setEndDate());
// store.dispatch(setStartDate());

//Reducers
const demoState = {
  expenses: [
    {
      id: "Nan and Roti",
      description: "Price For Naan Rooti",
      note: "Bhook Lagi thi is lea mangwai",
      amount: 70,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date or amount
    startDate: undefined,
    endDate: undefined,
  },
};
