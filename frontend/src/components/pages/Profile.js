import React from 'react';
import { useState, useEffect } from 'react';
import ProfileBox from '../ProfileBox';
import WatchlistBox from '../WatchlistBox';
import Notification from '../Notification';
import './Profile.css';


const Profile = () => {
    const [notificationMessage, setNotificationMessage] = useState('');

    const userdetails = JSON.parse(localStorage.getItem('user-details'));
    useEffect(() => { //if there's no user logged in, just render nothing.
      if (!userdetails) setNotificationMessage("Oh dear, seems you aren't logged in!");
    }, [userdetails]);

    return (
        <div className="float">
            <div className="profile-container">
                <Notification message={notificationMessage}/>
                {userdetails && <>
                <ProfileBox/>
                <WatchlistBox/>
                </>
                }
            </div>
        </div>
    )
}

export default Profile;