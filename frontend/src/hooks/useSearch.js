import {useState} from 'react';
import {useSearchContext} from './useSearchContext';
import searchService from '../services/searchService';

export const useSearch = () => {
    const {dispatch} = useSearchContext();
    const [notificationMessage, setNotificationMessage] = useState(''); //use for errors.

    const search = async (districtNumber, maxPrice, buyRent, publicOrPrivate, sortBy) => {
        try{
            let results;
            if (sortBy==='asc'){    
                results = await searchService.lowestPriceSearch(
                    districtNumber,
                    maxPrice, //since, if maxPrice=0, its still considered truthy
                    buyRent,
                    publicOrPrivate
                    )
                
                
            }
            
            else if (sortBy==='desc'){
                results = await searchService.highestPriceSearch(
                    districtNumber,
                    maxPrice, //since, if maxPrice=0, its still considered truthy
                    buyRent,
                    publicOrPrivate
                    )
            }
    
            else {
            //if sortBy isn't desc or asc then fuck u
            }

            dispatch({type: 'SET_SEARCH_RESULTS', payload: results});
            return 'success';
        }
        catch (error) {
            if (error.response){
                setNotificationMessage('Error occurred, please check again!');
            }
            else setNotificationMessage('Unknown error occurred, please try again.');
            return 'error';
        }
    }

    return {search, notificationMessage, setNotificationMessage};
}