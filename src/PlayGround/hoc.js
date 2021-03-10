// Higher Order Component

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>This info is: {props.info} </p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info please don't share</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please Log In to continue</p>
      )}
    </div>
  );
};

const AuthInfo = requireAuthentication(Info);

const AdminInfo = withAdminWarning(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={false} info="This is some info " />,
  document.getElementById("app")
);
