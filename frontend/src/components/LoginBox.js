import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';
import {useLogin} from '../hooks/useLogin';
import {useNavigate} from 'react-router-dom';

const LoginBox = ({isLoginBox, setLoginOrSignupBox}) => {
    const {login, notificationMessage, setNotificationMessage} = useLogin();
    const [emailValue, setEmailValue] = useState(); //so i can get it for resetting email
    const [resetBox, setResetBox] = useState(false); //defines if the reset password box is shown
    const navigate = useNavigate();

    const handleEmailValue = (event) => {
        setEmailValue(event.target.value);
    }

    //handles submitting login
    const submitLogin = (event) => { 
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const loginForm = Object.fromEntries(formData);
        login(emailValue, loginForm['password'])
        .then(response => {
            if (response==='success'){
                localStorage.setItem(
                    'user-details', 
                    JSON.stringify({'email': emailValue, 'name': loginForm['name']}))
                navigate("/");
            }
        });
    }

    //handles sending reset password token
    const forgotPassword = () => {
        if (!emailValue){
            setNotificationMessage('Input your email so a reset token can be sent.');
            return;
        }
        loginSignupService.forgotPassword(emailValue)
        .then(response => { 
            setNotificationMessage('Check your email for a reset token.');
            setResetBox(true);
        })
    }

    //handles resetting password with token and new password
    const submitReset = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const resetPassForm = Object.fromEntries(formData);
        if (resetPassForm['newPass']!=resetPassForm['confirmPass']) setNotificationMessage("Please confirm your new password properly.");

        loginSignupService.resetPassword(resetPassForm['newPass'], resetPassForm['token'])
        .then(response => {
            if (response.status==200) {
                console.log('password reset! logging in...');
                login(emailValue, resetPassForm['newPass'])
                navigate("/");
            }
        })
        .catch(error => setNotificationMessage("Error; maybe your token is wrong?"))
    }

    if (isLoginBox) return (
        <div className="float">
            <div className="login-signup-container">
                <div className="login-box">
                    <Notification message={notificationMessage} />
                    <p className="login-text"><strong>Log In</strong></p>
                    <form className="login-form" onSubmit={submitLogin} id="loginForm">
                        <input name="email" value={emailValue} onChange={handleEmailValue} className="login-form-input" type="text" placeholder="E-mail"/>
                        <input name="password" className="login-form-input" type="password" placeholder="Password"/>
                        <button className="login-button" type="submit">Login</button>
                    </form>

                    <div className="login-options">
                        <button className="login-options-button" onClick={() => forgotPassword()}>Forgot password?</button>
                        <button className="login-options-button" onClick={() => setResetBox(!resetBox)}>Reset password</button>
                        <button className="login-options-button" onClick={() => setLoginOrSignupBox(!isLoginBox)}>Register</button>
                    </div>
                </div>

                {resetBox &&
                <div className="login-box">
                    <p className="login-text"><strong>Reset Password</strong></p>
                    <form className="login-form" onSubmit={submitReset} id="loginForm">
                        <input name="token" className="login-form-input" placeholder="Reset Token"/>
                        <input name="newPass" className="login-form-input" type="password" placeholder="New Password"/>
                        <input name="confirmPass" className="login-form-input" type="password" placeholder="Confirm Password"/>
                        <button className="login-button" type="submit">Set New Password</button>
                    </form>
                </div>
                }
            </div>
            
        </div>
    )
    else return (<></>)
}




export default LoginBox;