import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';

const SignupBox = ({isLoginBox, setLoginOrSignupBox}) => {
    const [notificationMessage, setNotificationMessage] = useState(''); //can use for error or input validation.

    const submitSignup = (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const loginForm = Object.fromEntries(formData);
        console.log(loginForm);
        loginSignupService
            .sendLoginDetails(loginForm['loginId'], loginForm['password'])
            .then() //TO DO: set some return, depends on what info backend returns
            .catch(error => setNotificationMessage('Error occurred, please try again.'));
    }

    if (!isLoginBox) return (
        <div className="float">
            <div className="login-signup-container">
                <div className="login-box">
                    <Notification message={notificationMessage} />
                    <p className="login-text"><strong>Sign Up</strong></p>
                    <form className="login-form" onSubmit={submitSignup}>
                        <input name="name" className="login-form-input" type="text" placeholder="Name"/>
                        <input name="email" className="login-form-input" type="text" placeholder="Email"/>
                        <input name="phone" className="login-form-input" type="text" placeholder="Phone Number"/>
                        <input name="password" className="login-form-input" type="password" placeholder="Password"/>
                        <button className="login-button" type="submit">Create Account</button>
                    </form>
                    <div className="login-options">
                        <button className="login-options-button" onClick={() => setLoginOrSignupBox(!isLoginBox)}>Have an account? Log in!</button>
                    </div> 
                </div>
            </div>
        </div>
    )
    else return (<></>)
}

export default SignupBox;