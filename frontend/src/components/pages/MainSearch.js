import React from 'react';
import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar';
import './MainSearch.css';
import Map from '../Map.js';
import SearchListing from '../SearchListing';
import Notification from '../Notification';
import { useSearchContext } from '../../hooks/useSearchContext';
import searchService from '../../services/searchService';

const MainSearch = () => {
    const searchContext = useSearchContext();
    const [notificationMessage, setNotificationMessage] = useState('');
    const [dropdownList, setDropdownList] = useState([]); //to get district names from districtNumber.
    const [location, setLocation] = useState();

    //gets the dropdown data
    useEffect(() => { 
        searchService.getDropdownData()
        .then(response => {
            setDropdownList(response.data);
        });
      }, [])

    //set the location pin's location to the latest search result's location.
    useEffect(() => {
        if (searchContext.searchResults) {
            setLocation(dropdownList.find(dist => dist.districtNumber == searchContext.searchResults[0].districtNumber).generalLocation[0])
        }
        else setLocation('singapore');
    }, [searchContext]);


    //check if user is logged in. if not, just render nothing.
    const userdetails = JSON.parse(localStorage.getItem('user-details'));
    useEffect(() => { 
      if (!userdetails) setNotificationMessage("Oh dear, seems you aren't logged in!");
    }, [userdetails]);


    return (
        <>
            <Searchbar/>
            <Notification message={notificationMessage}/>
            {userdetails &&
                <div className="search-float">
                    <SearchListing/>
                    <Map location={{address: location}} zoomLevel={13}/> //sorry
                </div>
            }
        </>
    )

}

export default MainSearch;