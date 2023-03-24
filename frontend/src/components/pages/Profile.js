import React from 'react';
import { useState, useEffect } from 'react';
import ProfileBox from '../ProfileBox';
import WatchlistBox from '../WatchlistBox';
import './Profile.css';

const Profile = () => {
    return (
        <div className="float">
            <div className="profile-container">
                <ProfileBox/>
                <WatchlistBox/>
            </div>
        </div>
    )
}

export default Profile;