import React, { useState,useEffect} from 'react';
import searchService from '../services/searchService';
import { useSearch } from '../hooks/useSearch';
import Notification from './Notification';
import './Searchbar.css';

const Searchbar = ({setResults}) => {
    const [dropdownList, setDropdownList] = useState([]);
    const {search, notificationMessage, setNotificationMessage} = useSearch();

    searchService.getDropdownData()
    .then(results => setDropdownList(results));

    // this function submits the search query, and calls searchReducer to set global SearchContext as search results
    // so it can be fetched and displayed.
    const submitQuery = (event) => { 
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchQuery = Object.fromEntries(formData);
        console.log(searchQuery);
        search(searchQuery['districtNumber'],
            searchQuery['maxPrice'],
            searchQuery['buyRent'],
            searchQuery['publicOrPrivate'])

        .then(response => {
            if (response==='error'){

            }
        })
        
    }



    return (
        <>
            <div className="searchbar">
                <form onSubmit={submitQuery}>
                    <select name="buyRent" className="searchbarForm">
                        <option value="Buy">Buy</option>
                        <option value="Rent">Rent</option>
                    </select>

                    <select name="districtNumber" className="searchbarForm" defaultValue="default">
                        <option value="1000">District</option>
                    {
                        dropdownList.map(district => 
                        <option value={district.districtNumber}> {district.generalLocation} </option>
                        )
                    }

                    </select> 

                    <select name="propertyType" className="searchbarForm" defaultValue="default">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>

                    <input type="number" name="maxPrice" className="searchbarForm" placeholder="Max Price"/>
                    
                    <select name="sortBy" className="searchbarForm" defaultValue="default">
                        <option value='' default disabled>Sort By</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    <button type="submit" className="searchbarForm">Search</button>
                </form>
            </div>
            <Notification message={notificationMessage}/>
        </>
    )
}

export default Searchbar;