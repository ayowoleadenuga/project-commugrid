import React, { Component } from 'react'
import AuthHeader from '../AuthHeader'
import Backdrop from '../../Backdrop/Backdrop'
import SideDrawer from '../../SideDrawer.js/SideDrawer'
import './ForgotPassword.scss'
import ForgotPasswordComp from './ForgotPasswordComp'

export default class ForgotPassword extends Component {
    state = {
        siderDrawerOpen: false
      }
      drawerToggleClickHandler = () => {
        this.setState((prevState) => {
          return {siderDrawerOpen: !prevState.siderDrawerOpen}
        })
      }
      backdropHandler = () => {
        this.setState({ siderDrawerOpen: false })
      }
    
      render() {
        const { siderDrawerOpen } = this.state;
        let backdrop;
    
        if (siderDrawerOpen ) {
          backdrop = <Backdrop click={this.backdropHandler}/>
        }
    
        return (
            <div className="auth">
                <div className="auth__header">
                    <AuthHeader 
                        drawerClickHandler={this.drawerToggleClickHandler}
                        topic="Forgot Password"
                    />
                    <SideDrawer show={siderDrawerOpen} />
                    {backdrop}
                </div>
                <br/>
                <div className="auth__components">
                    <ForgotPasswordComp />
                </div>
            </div>
        )
    }
}
