import axios from 'axios';
import { Buffer } from "buffer";


//if there's a stored token, set the Authorization header so that APIs can be accessed.
const getStoredToken = () => JSON.parse(localStorage.getItem('user'));

//called in every watchlist function, to get userId from token. if no token, return null.
const getUserId = () => { 
    const storedToken = getStoredToken();
    if (!storedToken) return null;
    const userId = JSON.parse(atob(storedToken.token.split('.')[1])).id;
    console.log(`userId is: ${userId}`);
    return userId;
}

const getAuthHeaders = () => {
    const storedToken = getStoredToken();
    const headers = storedToken ? { 
    Authorization: `Bearer ${storedToken.token}`
} : {}; 
    return Object.assign({}, axios.defaults.headers.common, headers);
}

export default {
    getUserId,
    getAuthHeaders
}