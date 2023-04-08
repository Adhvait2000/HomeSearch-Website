import React, { useState, useEffect} from 'react';
import { List, ListContent} from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { useSearchContext } from '../hooks/useSearchContext';
import { useSearch } from '../hooks/useSearch';
import searchService from '../services/searchService';
import watchlistService from '../services/watchlistService';
import './SearchListing.css';



const SearchListing = () => {
  const location = useLocation(); //get location; if changes, reset search results.
  const searchContext = useSearchContext();
  const [dropdownList, setDropdownList] = useState([]); //to get district names from districtNumber.
  const {resetSearch} = useSearch();

  useEffect(() => { //gets the dropdown data
    searchService.getDropdownData()
    .then(response => {
        setDropdownList(response.data);
    });
  }, []) //TO DO: when we revisit searchpage after searching, searchContext already saved previous search
  // but dropdown data is null. to counter, make this synchronous.


  const addListing = (itemId) => { 
      watchlistService.addToWatchlist(itemId)
      .then(response => console.log(response.status));
      return;
  }

  useEffect(() => {
    const reset = () => resetSearch();
    return reset;
  }, [location]);

    return(
        <div className='search-list-container'>

        {searchContext.searchResults ? //if searchResults is null, render nothing. else, render it in the website.
        (searchContext.searchResults.map(house => {
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
                    {(house.propertyPrice || house.rentalPriceSqft) &&
                      <tr>
                        <th>Price/Rental:</th>  
                        {house.propertyPrice && <td><Link to='/sign-up'>{`$${house.propertyPrice}`}</Link></td>}
                        {house.rentalPriceSqft && <td><Link to='/sign-up'>{`$${house.rentalPriceSqft}`}</Link></td>}
                      </tr>
                    }
                    <tr>
                      <th>District:</th>
                      <td>{dropdownList.find(dist => dist.districtNumber == house.districtNumber).generalLocation}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button onClick={()=>addListing(house._id)}>Add to watchlist</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </List.List>
            </div>
          );
        }
        )) : (<></>)
        }
      </div>
    

    )
}

export default SearchListing;