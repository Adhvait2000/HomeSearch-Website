import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';
import {useLogin} from '../hooks/useLogin';

const LoginBox = ({isLoginBox, setLoginOrSignupBox}) => {
    const {login, notificationMessage, setNotificationMessage} = useLogin();

    const submitLogin = (event) => { //the actual login event, shouldve probably moved somewhere else but fuck it lol
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const loginForm = Object.fromEntries(formData);
        login(loginForm['email'], loginForm['password']);
    }

    

    if (isLoginBox) return (
        <div className="float">
            <div className="login-signup-container">
                <div className="login-box">
                    <Notification message={notificationMessage} />
                    <p className="login-text"><strong>Log In</strong></p>
                    <form className="login-form" onSubmit={submitLogin} id="loginForm">
                        <input name="email" className="login-form-input" type="text" placeholder="E-mail"/>
                        <input name="password" className="login-form-input" type="password" placeholder="Password"/>
                        <button className="login-button" type="submit">Login</button>
                    </form>
                    <div className="login-options">
                        <button className="login-options-button">Forgot password?</button>
                        <button className="login-options-button" onClick={() => setLoginOrSignupBox(!isLoginBox)}>Register</button>
                    </div> 
                </div>
            </div>
        </div>
    )
    else return (<></>)
}




export default LoginBox;