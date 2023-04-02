import React, { useState,useEffect} from 'react';
import './PEBar.css';
import searchService from '../services/searchService'; //for dropdown list
//TO DO: import and use price estimator service



const PriEsBar = ({setResults}) => {
    const [dropdownList, setDropdownList] = useState([]);

    searchService.getDropdownData()
    .then(results => setDropdownList(results));
   
    const submitQuery = (event) => { 
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchQuery = Object.fromEntries(formData);
        console.log(searchQuery);
    }
   //to check      
    const price=90;
    
    return(
        
        <><div className="floaty">
            <div className='price-estimate-container'>
        <div className="searchbar">
            <form onSubmit={submitQuery}>
                <div >
                <select name="buyRent" className="searchbarForm">
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                </select>
                </div>
                <div>
                <select name="propertyType" className="searchbarForm" defaultValue="default">
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                </div>
                <div>
                <select name="districtNumber" className="searchbarForm" defaultValue="default">
                    <option value="1000" default disabled>District</option>
                {
                    dropdownList.map(district => 
                    <option value={district.districtNumber}> {district.generalLocation} </option>
                    )
                }
                </select>
                </div>
                <button type="submit"  className="button">Search</button>
            </form>
            </div>
        
        <div className="estimated-price">
            <h3>Estimated Price:</h3>
            {/*need to get data from backend*/}
            <p>{price}</p>
            </div>
        </div>
        </div></>
    )
}

export default PriEsBar;