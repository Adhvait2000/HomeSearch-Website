import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';

const WatchlistBox = () => {
    const userdetails = localStorage.getItem('user');

    return (
        <>
        {userdetails &&
            <div className="box">
                <p className="large-text"><strong>Watchlist</strong></p>
            </div>
        }
        </>
    )
}

export default WatchlistBox;