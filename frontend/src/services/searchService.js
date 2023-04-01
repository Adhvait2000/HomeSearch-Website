import axios from 'axios';
const baseUrl = '/homesearch/v1/auth';

const getDropdownData = () => {
    return axios.get(`${baseUrl}/dropdown-data`);
}

