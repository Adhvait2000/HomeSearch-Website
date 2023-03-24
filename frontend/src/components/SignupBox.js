import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';

const SignupBox = ({isLoginBox, setLoginOrSignupBox}) => {
    const [notificationMessage, setNotificationMessage] = useState(''); //can use for error or input validation.

    const submitSignup = (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const signupForm = Object.fromEntries(formData);
        if (signupForm['password']!=signupForm['confirmPassword']){
            setNotificationMessage('Please confirm your password properly.');
            return;
        }

        loginSignupService
            .sendSignupDetails(signupForm['name'], signupForm['email'], signupForm['password'], "user")
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                if (error.response){
                    //if (error.response.status===401) setNotificationMessage('Error occurred, check your email/password!');
                    //else if (error.response.status===400) setNotificationMessage(error.response.data.error);
                    setNotificationMessage('Error occurred, please check again!');
                }
                else setNotificationMessage('Unknown error occurred, please try again.');
            });
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
                        <input name="password" className="login-form-input" type="password" placeholder="Password"/>
                        <input name="confirmPassword" className="login-form-input" type="password" placeholder="Confirm Password"/>
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