import React from 'react';
import "./Toolbar.scss"
import { withRouter } from "react-router-dom"
import DrawerToggleButton from '../../SideDrawer.js/DrawerToggleButton';
import { history } from '../../../utils/history';

const Toolbar = props => {
    const handlePageChange = () => {
        history.push("/auth/signin");
    }
    return (
        <header className="toolbar">
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={props.drawerClickHandler}/>
                </div>
                <div className="toolbar__logo"><a href="/">COMMUGRID</a></div>
                <div className="spacer" />
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><a href="/">News</a></li>
                        <li><a href="/">More Offers</a></li>
                        <li><a href="/">Marketplace</a></li>
                        <li><a href="/">About us</a></li>
                        <li><a href="/">Partners</a></li>
                        <li><a href="/">Reviews</a></li>
                        <li><button onClick={handlePageChange}>Login</button></li>
                        
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default withRouter(Toolbar);