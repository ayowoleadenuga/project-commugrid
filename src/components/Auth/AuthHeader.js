import React from 'react';
import DrawerToggleButton from '../SideDrawer.js/DrawerToggleButton';
import "./auth.scss"


const AuthHeader = props => {
    return (
        <div className="authHeader">
            <div className="authHeader__navigation">
                <div className="authHeader__logo"><a href="/">COMMUGRID</a></div>
                <div className="spacer" />
                <div className="authHeader__toggle-button">
                    <DrawerToggleButton click={props.drawerClickHandler}/>
                </div>
            </div>
            <div className="authHeader__heading">
                <p className="authHeader__heading-topic">{props.topic}</p>
                <p className="authHeader__heading-sub">{props.sub}</p>
            </div>
        </div>
    );
};

export default AuthHeader;