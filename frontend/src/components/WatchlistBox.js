import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';
import watchlistService from '../services/watchlistService';
import WatchlistDelete from './WatchlistList';

const WatchlistBox = () => {
    const user = localStorage.getItem('user');

    return (
        <>
        {!user && //remove the ! later!!!!!!!!! for checking only!!!
            <div className="box">
                <p className="large-text"><strong>Watchlist</strong></p>
                <WatchlistDelete/>
            </div>
        }
        </>
    )
}

export default WatchlistBox;