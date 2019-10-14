import React from "react";
import { Route, Redirect } from "react-router-dom";

class LogOut extends React.Component {
  componentDidMount() {
    this.props.logOut();
  }
  render() {
    return (
      <Redirect
        to={{ pathname: "/auth/signin", state: { from: this.props.location } }}
      />
    );
  }
}

export const PrivateRoute = ({
  component: Component,
  logOut,
  loggedIn,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <LogOut {...props} logOut={logOut} />
      )
    }
  />
);
