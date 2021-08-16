import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
// import {firebase} from "../actions/"

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p className="box-layout__subtitle">
        Its time to get your expenses under control
      </p>
      <button className="btn btn--primary" type="submit" onClick={startLogin}>
        Login With Google
      </button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
