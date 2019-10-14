import React, { Component } from 'react'
import Toolbar from '../Navbar/Toolbar/Toolbar'
import SideDrawer from '../SideDrawer.js/SideDrawer'
import Backdrop from '../Backdrop/Backdrop'
import './Homepage.scss'
import { MdSearch } from "react-icons/md"

export default class Homepage extends Component {
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
      handlePageChange = () => {
        this.props.history.push("/auth");
    }
    
      render() {
        const { siderDrawerOpen } = this.state;
        let backdrop;
    
        if (siderDrawerOpen ) {
          backdrop = <Backdrop click={this.backdropHandler}/>
        }
        return (
          <div className="homepage">
            <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
              <SideDrawer show={siderDrawerOpen} />
              {backdrop}
              
                <main>
                    <div className="homepage__main">
                       <div className="homepage__main-search">
                            <MdSearch size={25}/>
                            <input type="text" name="home" placeholder="Find affordable energy | tools"/>
                        </div>
                        <button>Search</button> 
                    </div>
                    <br />
                    <div className="homepage__header">
                        <p className="homepage__header-header">Get connected to</p>
                        <p className="homepage__header-header">affordable energy</p>
                        <p className="homepage__header-header">systems</p>
                        <p className="homepage__header-body">We provide unlimited access to a reliable range of</p>
                        <p className="homepage__header-body">tested and trusted energy providers and </p>
                        <p className="homepage__header-body">merchants.</p>
                    </div>
                    <div className="homepage__button">
                        <button onClick={this.handlePageChange}>Start Now</button>
                    </div>
                </main>
          </div>
        )
      }
}
