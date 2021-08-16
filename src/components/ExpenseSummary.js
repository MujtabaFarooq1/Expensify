import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import { Link } from "react-router-dom";
import selectExpensesTotal from "../selectors/expense-total";
import selectExpenses from "../selectors/expenses";

export const ExpenseSummary = ({ expensesTotal, expensesCount }) => {
  const expensesWord = expensesCount === 1 ? " expense " : " expenses ";
  const formattedExpensesTotal = numeral(expensesTotal / 100).format(
    " $0,0.00"
  );
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expensesCount}</span> {expensesWord} totalling{" "}
          <span>{formattedExpensesTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="btn btn--primary" to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
