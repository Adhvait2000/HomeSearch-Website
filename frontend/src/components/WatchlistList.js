import React, { useState,useEffect} from 'react';
import { List, ListContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './SearchListing.css';
import watchlistService from '../services/watchlistService';
import searchService from '../services/searchService';


const WatchlistList = () => {
  //random datafor test change later 
  const datajson=[
    {
        "id": 1,
        "type": "hdb",
        "Buy_Rent": "buy",
        "private/public": "private",
        "District": "60"
    },

    {
        "id": 2,
        "type": "condo",
        "Buy_Rent": "rent",
        "private/public": "private",
        "District": "40"
    },
    {
        "id": 3,
        "type": "condo",
        "Buy_Rent": "rent",
        "private/public": "private",
        "District": "40"
    },
    
    {
        "id": 4,
        "type": "building",
        "Buy_Rent": "rent",
        "private/public": "private",
        "District": "50"
    }
]
  const [watchlistItems, setWatchlistItems] = useState(null);
  const [dropdownList, setDropdownList] = useState([]); //to get district names from districtNumber.

  useEffect(() => { //gets the dropdown data
    searchService.getDropdownData()
    .then(response => {
        setDropdownList(response.data);
    });
  }, [])

  useEffect(() => {
    try{  
      (async () => await watchlistService.getWatchlist())()
      .then(watchlist => setWatchlistItems(watchlist));
  }
  catch{
      console.log('Some error occurred while loading watchlist.');
      setWatchlistItems(null);
  }
  }, [])



  const deleteListing = (itemId) => {
    const updatedWatchlist = watchlistItems.filter((item) => item.id != itemId);
    setWatchlistItems(updatedWatchlist);
    watchlistService.deleteFromWatchlist(itemId);
  }
    
    return(
        <div className='housing details'>
        {watchlistItems ?
        (watchlistItems.map(house => { 
          return (
            <div className='listing' key={house._id}>
              <List.List as='ul'>
                <h1 key={house._id}></h1> 
                <table>
                  <tbody>
                    <tr>
                      <th>Type:</th>
                      <td>{house.propertyPrivatePublic}</td>
                    </tr>
                    <tr>
                      <th>Buy/Rent:</th>  
                      <td><Link to='/sign-up'>{house.statusBuyRent}</Link></td>
                    </tr>
                    <tr>
                      <th>District:</th>
                      <td>{dropdownList.find(dist => dist.districtNumber == house.districtNumber).generalLocation}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button onClick={()=>deleteListing(house._id)}>Add to watchlist</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </List.List>
            </div>
          );
        })) : <div>There are no items in your watchlist.</div>}
      </div>
    

    )
}

export default WatchlistList;