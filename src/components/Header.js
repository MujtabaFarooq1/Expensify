import React from "react";
import { Link, NavLink } from "react-router-dom";
const Header = () => (
  <header>
    <h1>Expensify App</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
  </header>
);

export default Header;
