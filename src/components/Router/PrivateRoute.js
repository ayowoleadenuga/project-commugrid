import React from "react";
import { Route, Redirect } from "react-router-dom";

// class LogOut extends React.Component {
//   componentDidMount() {
//     this.props.logOut();
//   }
//   render() {
//     return (
//       <Redirect
//         to={{ pathname: "/auth/signin", state: { from: this.props.location } }}
//       />
//     );
//   }
// }

// export const PrivateRoute = ({
//   component: Component,
//   logOut,
//   loggedIn,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={props =>
//       loggedIn ? (
//         <Component {...props} />
//       ) : (
//         <LogOut {...props} logOut={logOut} />
//       )
//     }
//   />
// );

export const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/auth/signin', state: {from: props.location}}} />}
    />
  )
}
