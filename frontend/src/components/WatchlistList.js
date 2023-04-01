import React, { useState,useEffect} from 'react';
import { List, ListContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './SearchListing.css';
import watchlistService from '../services/watchlistService';


function Watchlist(){
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



  const getWatchlistItems = async () => { //use watchlistService to get the user's watchlist.
    try{
        const watchlistItems = await watchlistService.getWatchlist();
        return watchlistItems;
    }
    catch{
        return {};
    }
    }

  //const [watchlistItems, setwatchlistItems] = useState(getWatchlistItems());    change to this once backend is connected
  const [watchlistItems, setwatchlistItems] = useState(datajson);

  const deleteListing = (itemId) => {
    const updatedWatchlist = watchlistItems.filter((item) => item.id != itemId);
    setwatchlistItems(updatedWatchlist);
    watchlistService.deleteFromWatchlist(itemId);
  }
    
    return(
        <div className='housing details'>
        {watchlistItems.map(house => { 
          return (
            <div className='listing' key={house.id}>
              <List.List as='ul'>
                <h1 key={house.id}></h1>
                <table>
                  <tbody>
                    <tr>
                      <th>Type:</th>
                      <td>{house.type}</td>
                    </tr>
                    <tr>
                      <th>Buy/Rent:</th>
                      <td><Link to='/sign-up'>{house.Buy_Rent}</Link></td>
                    </tr>
                    <tr>
                      <th>District:</th>
                      <td>{house.District}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button onClick={() => deleteListing(house.id)}>Delete from watchlist</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </List.List>
            </div>
          );
        })}
      </div>
    

    )
}

export default Watchlist;