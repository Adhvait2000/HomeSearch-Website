import react from "react";
import { useState, useEffect } from 'react';
import PriEsBar from "../PEBar";

const PriceEstimator=()=>{
    return(
        <>
        <div className='PriceEstimator'>
           <h1 className="header" style={ {textAlign:"center",flex:"auto",fontSize:"36px",fontWeight:'bold',padding:"20px"} } >Price Estimator</h1>
           <PriEsBar className='pricebar'/>


        
           </div>
        </>

    )

  

}
export default PriceEstimator;
