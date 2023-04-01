import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';
import {useSignup} from '../hooks/useSignup';
import {useNavigate} from "react-router-dom";

const SignupBox = ({isLoginBox, setLoginOrSignupBox}) => {
    const {signup, notificationMessage, setNotificationMessage} = useSignup();
    const navigate = useNavigate();

    const submitSignup = (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const signupForm = Object.fromEntries(formData);
        if (signupForm['password']!=signupForm['confirmPassword']){
            setNotificationMessage('Please confirm your password properly.');
            return;
        }
        signup(signupForm['name'], signupForm['email'], signupForm['password'])
        .then(response => {
            if (response==='success'){
                localStorage.setItem(
                    'user-details', 
                    JSON.stringify({'email': signupForm['email'], 'name': signupForm['name']}))
                navigate("/");
            }
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