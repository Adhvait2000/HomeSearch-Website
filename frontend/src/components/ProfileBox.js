import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';
import profileService from '../services/profileService';


const ProfileBox = () => {
    const [notificationMessage, setNotificationMessage] = useState(''); //can use for error or input validation.

    const email = "test@email.com";
    const name = "John Doe";

    const changePass = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const signupForm = Object.fromEntries(formData);
        if (signupForm['newPassword']!=signupForm['confirmPassword']){
            setNotificationMessage('Please confirm your password properly.');
            return;
        }

        profileService
            .submitNewPass(signupForm['newPassword'])
            .then() //TO DO
            .catch();
    }

    return (
        <div className="box">
            <Notification message={notificationMessage}/>
            <p className="large-text"><strong>Welcome, {name}</strong></p>
            <p>Email: {email}</p>
            <p>Name: {name}</p>
            <hr className="line"></hr>
            <form className="changepass-form" onSubmit={changePass}>
                <input name="password" className="changepass-form-input" type="password" placeholder="Current Password"/>
                <input name="newPassword" className="changepass-form-input" type="password" placeholder="New Password"/>
                <input name="confirmPassword" className="changepass-form-input" type="password" placeholder="Confirm Password"/>
                <button className="login-button" type="submit">Change Password</button>
            </form>

            <hr></hr>
        </div>
    )
}

export default ProfileBox;