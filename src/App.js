import React, { Component } from 'react';
import "./App.scss"
import { Router, Route, Switch} from "react-router-dom"
import Homepage from './components/Homepage/Homepage';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MainApp from './components/App/App'
import Auth from './components/Auth';
import { PublicOnlyRoute } from './components/Router/PublicOnlyRoute';
import { PrivateRoute } from './components/Router/PrivateRoute';
import { authActions } from './components/Auth/Redux/authActions';
import { history } from './utils/history';
import { authService } from './components/Auth/Redux/authService';

class App extends Component {
  
  render() {
    const { submitted: loggedIn, logout } = this.props;
    return (
      <Router history={history}>
        <Switch>
        <PrivateRoute
            loggedIn={authService.loggedIn}
            path="/app"
            logOut={logout}
            component={MainApp}
          />
          <PublicOnlyRoute
            loggedIn={authService.loggedIn}
            path="/auth"
            component={Auth}
          />
          <Route path="/" component={Homepage} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  const { submitted} = state.auth;

  return {
    submitted,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(authActions.login, dispatch),
    logout: bindActionCreators(authActions.logout, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
