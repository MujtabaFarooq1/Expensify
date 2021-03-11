import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      -{numeral(amount / 100).format("$0,0.00")}-
      {moment(createdAt).format("MMMM Do, YYYY")}
    </p>
  </div>
);

//const mapStateToProps = (state) => ({ filters: state.filters });

export default ExpenseListItem;

//export default ExpenseListItem;
