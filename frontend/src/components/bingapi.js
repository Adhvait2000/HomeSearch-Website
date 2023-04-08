import React from 'react';
import {useState, useEffect} from 'react';
import searchService from '../services/searchService';
import { useSearchContext } from '../hooks/useSearchContext';
import "./bingapi.css";

const BingSearch = () => {
    const searchContext = useSearchContext();
    const [dropdownList, setDropdownList] = useState([]); //to get district names from districtNumber.

    useEffect(() => { 
      searchService.getDropdownData()
      .then(response => {
          setDropdownList(response.data);
      });
    }, [])
    
    const search = (searchTerm) => {
      // make a request to the Bing Search API
      fetch('https://api.bing.microsoft.com/v7.0/search?q=' + searchTerm + ' houses', {
        headers: {
          'Ocp-Apim-Subscription-Key': '42c5fd756c5c4e45b061d7c6e4d69328'
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);

        // display the search results on the webpage
        var resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        data.webPages.value.forEach(function(result) {
          var link = document.createElement('a');
          link.href = result.url;
          link.textContent = result.name;
          resultsDiv.appendChild(link);
        });
      });
    }

    useEffect(() => {
      if (searchContext.searchResults){
        search(dropdownList.find(dist => dist.districtNumber == searchContext.searchResults[0].districtNumber).generalLocation[0]);
      }
      
    }, [searchContext])
    

    return (
      <div className='container'>
        <div><h1>Related Search Results</h1></div>
        <div id="results"></div>
      </div>
    );
}

export default BingSearch;