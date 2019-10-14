import React, { Component } from 'react'
import AuthHeader from '../AuthHeader'
import Backdrop from '../../Backdrop/Backdrop'
import SideDrawer from '../../SideDrawer.js/SideDrawer'
import './Signin.scss'
import SigninComp from './SigninComp'

export default class Signin extends Component {
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
                        topic="Login"
                    />
                    <SideDrawer show={siderDrawerOpen} />
                    {backdrop}
                </div>
                <br/>
                <div className="auth__components">
                    <SigninComp />
                </div>
            </div>
        )
    }
}
