import React, { useState,useEffect} from 'react';
import './Searchbar.css';

const Searchbar = ({setResults}) => {

    const submitQuery = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchQuery = Object.fromEntries(formData);
        console.log(searchQuery);

        //TO DO: pass to backend and get the query
    }


    return (
        <div className="searchbar">
            <form onSubmit={submitQuery}>
                <select name="buyRent" className="searchbarForm">
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                </select>

                <select name="propertyType" className="searchbarForm" defaultValue="default">
                    <option value="default" disabled>Property Type</option>
                    <option value="all">All</option>
                    <option value="hdb">HDB Flat</option>
                    <option value="condo">Condominum</option>
                    <option value="landed">Landed</option>
                </select> 

                <input type="number" name="minPrice" className="searchbarForm" placeholder="Min Price"/>
                <input type="number" name="maxPrice" className="searchbarForm" placeholder="Max Price"/>
                <button type="submit" className="searchbarForm">Search</button>
            </form>
        </div>
    )
}

export default Searchbar;