import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicOnlyRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn ? (
        <Redirect
          to={{ pathname: "/app", state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);
