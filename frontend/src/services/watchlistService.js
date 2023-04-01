import axios from 'axios';
import {Buffer} from 'buffer';
const baseUrl = '/homesearch/v1/auth';

const getUserId = () => { //called in every watchlist function, to get userId from token. if no token, return null.
    if (!localStorage.getItem('user')) return null;
    const decoded = Buffer.from(JSON.parse(localStorage.getItem('user')).token, 'base64');
    const userId = JSON.parse(decoded.split('.')[1]).id;
    return userId;
}


const getWatchlist = async () => {
    const userId = getUserId();
    if (!userId) {
        console.log('No user is logged in.');
        return;
    }
    return axios.get(`${baseUrl}/${userId}`);
}


const addToWatchlist = async () => {
    const userId = getUserId();
    if (!userId) {
        console.log('No user is logged in.');
        return;
    }
    return axios.post(`${baseUrl}/${userId}`);
}


const deleteFromWatchlist = async (itemId) => {
    const userId = getUserId();
    if (!userId) {
        console.log('No user is logged in.');
        return;
    }
    return axios.delete(`${baseUrl}/${userId}/${itemId}`);
}

export default {
    getWatchlist,
    addToWatchlist,
    deleteFromWatchlist
};