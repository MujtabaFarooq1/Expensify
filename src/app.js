import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//Redux Store
import configureStore from "./store/configureStore";
// Component Imports
import AppRouter from "./routers/AppRouter";
import { startSetExpenses } from "./actions/expenses";
// CSS File Imports
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
//Importing Firebase connction
//import "./firebase/firebase";

// Creating Redux Store
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// Rendering the app
ReactDOM.render(<p>Loading ... </p>, document.getElementById("app"));

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById("app"));
});

// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log(visibleExpenses);
// });
