import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// Redux Imports
//Store
import configureStore from "./store/configureStore";
//Actions
import { addExpense, removeExpense, editExpense } from "./actions/expenses";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "./actions/filters";
//Selectors
import getVisibleExpenses from "./selectors/expenses";

// Component Imports
import AppRouter from "./routers/AppRouter";

// CSS File Import
import "normalize.css/normalize.css";
import "./styles/styles.scss";
//Import for datetime picker css
import "react-dates/lib/css/_datepicker.css";

// Creating Redux Store
const store = configureStore();

// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log(visibleExpenses);
// });

store.dispatch(addExpense({ description: "Water Bill", amount: 4500 }));
store.dispatch(addExpense({ description: "Gas Bill", createdAt: 1000 }));
store.dispatch(addExpense({ description: "Rent", amount: 119020 }));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// Rendering the app
ReactDOM.render(jsx, document.getElementById("app"));
