import React from "react";
import'./HeroSection.css';
import '../App.css' ;
import img from './hhhh.jpg';
function HeroSection(){
    return(
        <div style={{ backgroundImage:`url(${img})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",height: 700,
        width:"1000"
        }}>
            <div className='hero-text'>
              <h1 >Find the <i className='fas fa-quote-left'></i> &nbsp;perfect&nbsp;<i className='fas fa-quote-right'></i> &nbsp;space for you &nbsp;<i className="fa-regular fa-thumbs-up" /> </h1>
      </div>
      
      </div>
    );
}
export default HeroSection;