import React from 'react';
import { authService } from '../Auth/Redux/authService';

const MainApp = () => {
    const logout = async () => {
       await authService.logout();
        return document.location.reload()
    }
    return (
        <div style={{margin: "25rem"}}>
            <h3>You are now logged in</h3>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default MainApp;