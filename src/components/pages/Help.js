import React from 'react';
import  '../../App';
import './Help.css';


function Help(){
    return(
        <>
        <div className='float'>
        <div className='help-container'>
        
        <div className='help-article'>
            <h1> <i className='fa-regular fa-circle-question'></i> &nbsp;Help </h1>
            <p>Contact us at +65 6123 4567 or use the link provided below</p>
            <a href="https://youtu.be/xvFZjo5PgG0">Homesearch FAQ and helpline</a>
        </div>
        </div>
        </div> 
        </>
    );
}
export default Help;