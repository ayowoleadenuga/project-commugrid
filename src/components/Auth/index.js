import React, { Component } from 'react'
import Login from './Login/Login'
import { Switch, Route } from 'react-router-dom'
import Register from './Login/Register'
import Signin from './Signin/Signin'
import ForgotPassword from './ForgotPassword/ForgotPassword'

export default class Auth extends Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <Switch>
                    <Route path={match.url} exact component={Login} />
                    <Route path={`${match.url}/signup`} exact component={Register} />
                    <Route path={`${match.url}/signin`} exact component={Signin} />
                    <Route path={`${match.url}/forgot-password`} exact component={ForgotPassword} />
                    
                </Switch>
            </div>
        )
    }
}
