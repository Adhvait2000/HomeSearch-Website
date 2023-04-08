import React, { useState,useEffect} from 'react';
import './PEBar.css';
import searchService from '../services/searchService'; //for district list
import priceEstimatorService from '../services/priceEstimatorService';


const PriEsBar = () => {
    const [districtList, setDistrictList] = useState([]);
    const [propertyTypeList, setPropertyTypeList] = useState([]);
    const [townStats, setTownStats] = useState();
    const [price, setPrice] = useState('-');

    //gets and sets dropdown list (for districts)
    useEffect(() => {
        searchService.getDropdownData()
        .then(response => {
            setDistrictList(response.data); 
        });
    }, [])

    //gets and sets dropdown list (for property types)
    useEffect(() => {
        priceEstimatorService.getPropertyTypeList()
        .then(response => {
            setPropertyTypeList(response.data); 
        });
    }, [])
   
    const submitQuery = (event) => { 
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchQuery = Object.fromEntries(formData);
        console.log(searchQuery);

        //gets the price
        priceEstimatorService.getEstimatePrice(
            searchQuery['district'],
            searchQuery['property'],
            searchQuery['publicprivate'],
        )
        .then(response => setPrice(response.data['Estimated house price']))
        .catch(error => {
            if (error.response.status==404) setPrice('No data found for this criteria.');
            }) 

        //gets town data
        priceEstimatorService.getTownStatistics(searchQuery['district'])
        .then(response => setTownStats(response.data[0]));
        }
        
    
    return(
        
        <>
        <div className="floaty">
            <div className='price-estimate-container'>
        <div className="searchbar">
            <form onSubmit={submitQuery}>

                <div>
                <select name="district" className="searchbarForm" defaultValue="default">
                    <option value="1000" default>District</option>
                    {
                        districtList.map(district => 
                        <option value={district.districtNumber}> {district.generalLocation} </option>
                        )
                    }   
                </select>
                </div>

                <div>
                <select name="publicprivate" className="searchbarForm" defaultValue="default">
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                </div>

                <div>
                <select name="property" className="searchbarForm" defaultValue="default">
                    <option value="" default>Property Type</option>
                    {
                        propertyTypeList.map(type => 
                        <option value={type}> {type} </option>
                        )
                    }
                </select>
                </div>

                <button type="submit"  className="button">Search</button>
            </form>
            </div>
        
            <div className="estimated-price (SGD):">
                <h3>Estimated Price:</h3>
            <p>{parseFloat(price)==NaN && '$'}{price ? parseInt(price) : '-'}</p>
            </div>

            {townStats ? (
                <div className="estimated-price">
                    <h3>District Statistics</h3>
                    <p>Location: {townStats.generalLocation}</p>
                    <p>Average Private Price: ${townStats.averagePricePvt ? townStats.averagePricePvt : '-'}</p>
                    <p>Average Public Price: ${townStats.averagePricePublic ? townStats.averagePricePublic : '-'}</p>
                    <p>Average Overall Price: ${townStats.averagePriceAll ? townStats.averagePriceAll : '-'}</p>
                </div>
            ) : <></>}

        </div>
        </div>
        </>
    )
}

export default PriEsBar;