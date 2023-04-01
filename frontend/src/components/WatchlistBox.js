import loginSignupService from '../services/loginSignupService';
import Notification from './Notification';
import { useState, useEffect } from 'react';
import watchlistService from '../services/watchlistService';
import WatchlistDelete from './WatchlistDelete';

const WatchlistBox = () => {
    const user = localStorage.getItem('user');

    const getWatchlistItems = async () => {
    try{
        const watchlistItems = await watchlistService.getWatchlist();
        return watchlistItems;
    }
    catch{
        return {};
    }
    }

    return (
        <>
        {!user &&
            <div className="box">
                <p className="large-text"><strong>Watchlist</strong></p>
                
                <WatchlistDelete/>
            </div>
        }
        </>
    )
}

export default WatchlistBox;