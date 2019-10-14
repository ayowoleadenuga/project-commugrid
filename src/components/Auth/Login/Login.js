import React, { Component } from 'react'
import AuthHeader from '../AuthHeader'
import Backdrop from '../../Backdrop/Backdrop'
import SideDrawer from '../../SideDrawer.js/SideDrawer'
import './login.scss'
import MainAuth from '../main.auth'

export default class Login extends Component {
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
                      topic="Join CommuGrid"
                      sub="Access our ecosystem of renewable energy solutions"
                    />
                    <SideDrawer show={siderDrawerOpen} />
                    {backdrop}
                </div>
                <br/>
                <div className="auth__components">
                    <MainAuth />
                </div>
            </div>
        )
    }
}
