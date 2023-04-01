import React from 'react';
import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar';
import './MainSearch.css';
import Map from '../Map.js';
import SearchListing from '../SearchListing';

const MainSearch = () => {
    return (
        <>
            <Searchbar/>
            <div className="search-float">
                <SearchListing/>
                <Map location={{address: '1600 Amphitheatre Parkway, Mountain View, california.', lat: 37.42216, lng: -122.08427}} zoomLevel={17}/>
            </div>
        </>
    )

}

export default MainSearch;