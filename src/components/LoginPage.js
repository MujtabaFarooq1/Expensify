import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";
// import {firebase} from "../actions/"

export const LoginPage = ({ startLogin }) => (
  <div>
    <button type="submit" onClick={startLogin}>
      Login
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
