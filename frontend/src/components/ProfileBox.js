import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';
import profileService from '../services/profileService';


const ProfileBox = () => {
    const [notificationMessage, setNotificationMessage] = useState('');
    const [email, setEmail] = useState('');
    const [profilename, setProfilename] = useState('');
    
    const userdetails = JSON.parse(localStorage.getItem('user-details'));
    
    useEffect(() => {
      if (!userdetails) {
        setNotificationMessage("Oh dear, seems you aren't logged in!");
      } else {
        setEmail(userdetails.email);
        setProfilename(userdetails.name);
      }
    }, [userdetails]);
    


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
            {userdetails && <div>
                <p className="large-text"><strong>Welcome, {profilename}</strong></p>
                <p>Email: {email}</p>
                <hr className="line"></hr>
                <form className="changepass-form" onSubmit={changePass}>
                    <input name="password" className="changepass-form-input" type="password" placeholder="Current Password"/>
                    <input name="newPassword" className="changepass-form-input" type="password" placeholder="New Password"/>
                    <input name="confirmPassword" className="changepass-form-input" type="password" placeholder="Confirm Password"/>
                    <button className="login-button" type="submit">Change Password</button>
                </form>
            </div>}
        </div>
    )
}

export default ProfileBox;