import axios from 'axios';

const storedToken = JSON.parse(localStorage.getItem('user'));

//if there's a stored token, set the Authorization header so that APIs can be accessed.
const headers = storedToken ? { 
    Authorization: `Bearer ${storedToken.token}`
} : {}; 

//called in every watchlist function, to get userId from token. if no token, return null.
const getUserId = () => { 
    if (!storedToken) return null;
    const decoded = Buffer.from(storedToken.token, 'base64');
    const userId = JSON.parse(decoded.split('.')[1]).id;
    console.log(`userId is: ${userId}`);
    return userId;
}

const getAuthHeaders = () => {
    return {
        headers: Object.assign({}, axios.defaults.headers.common, headers)
      }
}

export default {
    getUserId,
    getAuthHeaders
}