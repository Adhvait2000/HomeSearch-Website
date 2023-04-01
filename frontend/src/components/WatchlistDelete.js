import React, { useState,useEffect} from 'react';
import { List, ListContent } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './TempDisplay.css';


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
            "id": 2,
            "type": "condo",
            "Buy_Rent": "rent",
            "private/public": "private",
            "District": "40"
        },
        
        {
            "id": 3,
            "type": "building",
            "Buy_Rent": "rent",
            "private/public": "private",
            "District": "50"
        }
    ]
    return(
        <div className='housing details'>
        {datajson.map(house => {
          return (
            <div className='housingdetails' key={house.id}>
              <List.List as='ul'>
                <h1 block key={house.id}></h1>
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
                        <button>Delete from watchlist</button>
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