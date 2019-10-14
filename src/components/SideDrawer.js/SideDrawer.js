import React from 'react';
import './SideDrawer.scss';

const SideDrawer = props => {
    let drawerClasses= 'side-drawer'
    if (props.show) {
        drawerClasses = 'side-drawer open'
    }
    return (
        <nav className={`${drawerClasses}${" "}${props.visibleClass}`}>
            <ul>
                <li><a href="/">News</a></li>
                <li><a href="/">More Offers</a></li>
                <li><a href="/">Marketplace</a></li>
                <li><a href="/">About us</a></li>
                <li><a href="/">Partners</a></li>
                <li><a href="/">Reviews</a></li>
                <li><button>Login</button></li>
            </ul>
        </nav>
    );
};

export default SideDrawer;