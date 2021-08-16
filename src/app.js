import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//Redux Store
import configureStore from "./store/configureStore";
// Component Imports
import AppRouter, { history } from "./routers/AppRouter";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
// CSS File Imports
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
//Importing Firebase connction
import { firebase } from "./firebase/firebase";

import LoadingPage from "./components/LoadingPage";

// Creating Redux Store
const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

//
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

// Rendering the app
ReactDOM.render(<LoadingPage />, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

// store.subscribe(() => {
//   const state = store.getState();
//   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//   console.log(visibleExpenses);
// });
