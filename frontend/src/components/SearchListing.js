import React, { useState, useEffect} from 'react';
import { List, ListContent} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSearchContext } from '../hooks/useSearchContext';
import './SearchListing.css';


//TO DO: import search context and use it to display search results


const userid = 1;
const SearchListing = () => {
  const searchContext = useSearchContext();

  const addListing = (itemId) => {
      return;
  }

//random datafor test
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

    const x = searchContext.searchResults ? searchContext.searchResults : datajson; //temporary, till i get backend up.
    console.log(JSON.stringify(x))

    return(
        <div className='search-list-container'>

        {x.map(house => {
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
                        <button onClick={()=>addListing(house.id)}>Add to watchlist</button>
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

export default SearchListing;