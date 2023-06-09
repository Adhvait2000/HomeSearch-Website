import axios from 'axios';
import tokenAndHeaderPrep from './tokenAndHeaderPrep';

const baseUrl = '/homesearch/v1/watchlist';


//API request functions


const getWatchlist = async () => {
    const userId = tokenAndHeaderPrep.getUserId();
    if (!userId) {
        console.log('No user is logged in.');
        return null;
    }
    return axios.get(`${baseUrl}/${userId}`, {
        headers: tokenAndHeaderPrep.getAuthHeaders()
      });
}

const addToWatchlist = async (itemId) => {
    const userId = tokenAndHeaderPrep.getUserId();
    if (!userId) {
        console.log('No user is logged in.');
        return;
    }
    return axios.post(`${baseUrl}/${userId}/${itemId}`, {}, {
        headers: tokenAndHeaderPrep.getAuthHeaders()
      });
}   

const deleteFromWatchlist = async (itemId) => {
    const userId = tokenAndHeaderPrep.getUserId();
    if (!userId) {
        console.log('No user is logged in.');
        return;
    }
    return axios.delete(`${baseUrl}/${userId}/${itemId}`, {
        headers: tokenAndHeaderPrep.getAuthHeaders()
      });
}

export default {
    getWatchlist,
    addToWatchlist,
    deleteFromWatchlist
};