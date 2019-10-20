import React from 'react';
import { connect } from "react-redux";
import { authActions } from '../Auth/Redux/authActions';

const MainApp = ({ logout }) => {
    const logoutHandler = async () => {
       return await logout();
    }
    return (
        <div style={{padding: "20%"}}>
            <h3>You are now logged in</h3>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(authActions.logout())
});

export default connect(null, mapDispatchToProps)(MainApp);