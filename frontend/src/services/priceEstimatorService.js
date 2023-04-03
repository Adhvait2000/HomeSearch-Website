import axios from 'axios';
import tokenAndHeaderPrep from './tokenAndHeaderPrep';
const baseUrl = '/homesearch/v1/estimator';

const getEstimatePrice = (districtNumber, propertyType, publicOrPrivate) => {
    const params = {
        district: districtNumber,
        property: propertyType ? propertyType : null,
        publicprivate: publicOrPrivate
    }

    return axios.get(`${baseUrl}/estimate-price`, {
        params: params,
        headers: tokenAndHeaderPrep.getAuthHeaders()
      });
    
}

//list of property types
const getPropertyTypeList = () => {
    return axios.get(`${baseUrl}/property-type-list`, {
        headers: tokenAndHeaderPrep.getAuthHeaders()
      });
}

//gets list of property prices by district
const getPricesByDistrict = (districtNumber) => {
    return axios.get(`${baseUrl}/estimate-price/${districtNumber}`, {
        headers: tokenAndHeaderPrep.getAuthHeaders()
      });
}

//gets statistics for that district
const getTownStatistics = (districtNumber) => {
    return axios.get(`${baseUrl}/${districtNumber}`, {
        headers: tokenAndHeaderPrep.getAuthHeaders()
      });
}

export default {
    getEstimatePrice,
    getPropertyTypeList,
    getPricesByDistrict,
    getTownStatistics
}