import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';

const LoginBox = ({isLoginBox, setLoginOrSignupBox}) => {
    const [notificationMessage, setNotificationMessage] = useState(''); //sets error message.

    const submitLogin = (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const loginForm = Object.fromEntries(formData);
        loginSignupService
            .sendLoginDetails(loginForm['loginId'], loginForm['password'])
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                if (error.response){
                    if (error.response.status===401) setNotificationMessage('Error occurred, check your email/password!');
                    else if (error.response.status===400) setNotificationMessage('Error occurred, please input something!');
                }
                else setNotificationMessage('Unknown error occurred, please try again.');
            });
    }

    

    if (isLoginBox) return (
        <div className="float">
            <div className="login-signup-container">
                <div className="login-box">
                    <Notification message={notificationMessage} />
                    <p className="login-text"><strong>Log In</strong></p>
                    <form className="login-form" onSubmit={submitLogin} id="loginForm">
                        <input name="loginId" className="login-form-input" type="text" placeholder="E-mail"/>
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