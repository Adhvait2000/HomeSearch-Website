import axios from 'axios';
import tokenAndHeaderPrep from './tokenAndHeaderPrep';
const baseUrl = '/homesearch/v1/search';

//gets district data, for informational table/dropdown options
const getDropdownData = () => {
    return axios.get(`${baseUrl}/dropdown-data`, {
        headers: tokenAndHeaderPrep.getAuthHeaders()
      });
}

//gets priciest house listings
const highestPriceSearch = (districtNumber, maxPrice, buyOrRent, publicOrPrivate) => { 
    const params = {}
    if (maxPrice) params.maxPrice = maxPrice;
    params.buyOrRent = buyOrRent;
    if (publicOrPrivate) params.publicOrPrivate = publicOrPrivate;

    return axios.get(`${baseUrl}/getHousingList/${districtNumber}`, {
        params: params,
        headers: tokenAndHeaderPrep.getAuthHeaders()
    })
}

//gets cheapest house listings
const lowestPriceSearch = (districtNumber, maxPrice, buyOrRent, publicOrPrivate) => { 
    const params = {}
    if (maxPrice) params.maxPrice = maxPrice;
    params.buyOrRent = buyOrRent;
    if (publicOrPrivate) params.publicOrPrivate = publicOrPrivate;

    return axios.get(`${baseUrl}/getBudgetSearch/${districtNumber}`, {
        params: params,
        headers: tokenAndHeaderPrep.getAuthHeaders()
    })
}


const singleHouseDetails = (houseId) => {
    return axios.get(`${baseUrl}/getSingleHouseDetails/${houseId}`, {
        headers: tokenAndHeaderPrep.getAuthHeaders()
    })
}

export default {
    getDropdownData,
    highestPriceSearch,
    lowestPriceSearch,
    singleHouseDetails
}