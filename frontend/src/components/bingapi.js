import React from 'react';
import "./bingapi.css";
class BingSearch extends React.Component {
  search() {
    // get the search term from the input field
    var searchTerm = document.getElementById('search-term').value;

    // make a request to the Bing Search API
    fetch('https://api.bing.microsoft.com/v7.0/search?q=' + searchTerm, {
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

  render() {
    return (
      <div className='container'>
        <div><h1>Bing search</h1></div>
        <div>
        <form>
          <input type="text" id="search-term" />
          <button type="button" onClick={this.search}>Search</button>
        </form>
        </div>
        
        <div id="results"></div>
      </div>
    );
  }
}

export default BingSearch;