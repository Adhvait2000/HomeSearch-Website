import React, { useState,useEffect} from 'react';
import { List, ListContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './SearchListing.css';
import watchlistService from '../services/watchlistService';
import searchService from '../services/searchService';


const WatchlistList = () => {
  const [watchlistItems, setWatchlistItems] = useState(null); 
  const [dropdownList, setDropdownList] = useState([]); //to get district names from districtNumber.
  const [fullWatchlist, setFullWatchlist] = useState([]);

  //gets the dropdown data
  useEffect(() => { 
    searchService.getDropdownData()
    .then(response => {
        setDropdownList(response.data);
    });
  }, [])

  //gets watchlist from backend; if none, sets to null
  useEffect(() => {
    try{  
      (async () => await watchlistService.getWatchlist())()
      .then(response => {
        console.log(response.data);
        if (response.data===[]) setWatchlistItems(null);
        else setWatchlistItems(response.data);
      });
  }
  catch{
      console.log('Some error occurred while loading watchlist.');
      setWatchlistItems(null);
  }
  }, [])

  //gets info for each watchlist item
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('updating fullWatchlist...');
        const responsePromises = watchlistItems.map(item => searchService.singleHouseDetails(item));
        const responses = await Promise.all(responsePromises);
        const fullWatchlist = responses.map(response => response.data);
        setFullWatchlist(fullWatchlist);
      } catch(error) {
        console.log("Couldn't fetch data for watchlist items.", error);
      }
    }
    fetchData();
  }, [watchlistItems]);

  //deletes listing when button is pressed, and sends delete request to backend
  const deleteListing = (itemId) => {
    const updatedWatchlist = fullWatchlist.filter((item) => item._id != itemId);
    setFullWatchlist(updatedWatchlist);
    watchlistService.deleteFromWatchlist(itemId);
  }
    
    return(
        <div className='housing details'>
        {(fullWatchlist!=[] || !fullWatchlist) ?
        (fullWatchlist.map(house => { 
          return (
            <div className='listing' key={house._id}>
              <List.List as='ul'>
                <h1 key={house._id}></h1> 
                <table>
                  <tbody>

                  {house.propertyProjectName &&
                    <tr>
                      <th>Project Name:</th>
                      <td>({house.propertyProjectName})</td>
                    </tr>
                  }

                    <tr>
                      <th>Type:</th>
                      <td>{house.propertyPrivatePublic} ({house.propertyType || ''})</td>
                    </tr>

                    <tr>
                      <th>For Sale/Rent:</th>  
                      <td><Link to='/sign-up'>{house.statusBuyRent}</Link></td>
                    </tr>

                    <tr>
                      <th>Price/Rent:</th>  
                      <td><Link to='/sign-up'>{house.propertyPrice || house.rentalPriceSqft || '-'}</Link></td>
                    </tr>

                    <tr>
                      <th>District:</th>
                      <td>{dropdownList!=[] ?
                      dropdownList.find(dist => dist.districtNumber == house.districtNumber).generalLocation : house.districtNumber}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="2">
                        <button onClick={()=>deleteListing(house._id)}>Delete</button>
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