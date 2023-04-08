
import Notification from './Notification';
import { useState, useEffect } from 'react';
import loginSignupService from '../services/loginSignupService';


const ProfileBox = () => {
    const [notificationMessage, setNotificationMessage] = useState('');
    const [email, setEmail] = useState('');
    const [profilename, setProfilename] = useState('');
    
    const userdetails = JSON.parse(localStorage.getItem('user-info')) || JSON.parse(localStorage.getItem('user-details'));
    console.log(userdetails);
    
    useEffect(() => {
      if (userdetails) {
        setEmail(userdetails.email);
        setProfilename(userdetails.name);
      }
    }, [userdetails]);

    //sends request for reset token
    const resetPass = () => {
        loginSignupService.forgotPassword(email)
        .then(response => setNotificationMessage('Check your email for a reset token.'))
        .catch(error => setNotificationMessage('An error occurred. Please try again.'))
    }
    
    //handles change of password
    const changePass = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const changePassForm = Object.fromEntries(formData);
        if (changePassForm['newPassword']!=changePassForm['confirmPassword']){
            setNotificationMessage('Please confirm your password properly.');
            return;
        }

        loginSignupService.resetPassword(changePassForm['newPassword'], changePassForm['token'])
        .then(response => {
            if (response.status==200) {
                console.log('password changed!');
                setNotificationMessage('Password changed!');
            }
        })
        .catch(error => setNotificationMessage("Error; maybe your token is wrong?"))
    }



    return (
        <div className="box">
            <Notification message={notificationMessage}/>
            {userdetails && <div>
                <p className="large-text"><strong>Welcome, {profilename}</strong></p>
                <p>Email: {email}</p>
                <hr className="line"></hr>
                <form className="changepass-form" onSubmit={changePass}>
                    <input name="token" className="changepass-form-input" placeholder="Reset Token"/>
                    <input name="newPassword" className="changepass-form-input" type="password" placeholder="New Password"/>
                    <input name="confirmPassword" className="changepass-form-input" type="password" placeholder="Confirm Password"/>
                    <button className="smaller-login-button" type="button" onClick={resetPass}>Get Reset Token</button>
                    <button className="login-button" type="submit">Change Password</button>
                </form>
            </div>}
        </div>
    )
}

export default ProfileBox;