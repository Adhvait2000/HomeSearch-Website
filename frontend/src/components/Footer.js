import React from "react";
import'./Footer.css'

function Footer(){
    return(
    <div className="footer-container">
        <section className="footer-subscription">
            <p className="footer-subscription-heading">
                Join the Homesearch newsletter to recieve
                instant notifications
            </p>
            <p className="footer-subscription-text">
                You can unsubscribe at any time
            </p>
            <small className='website-rights'> Homesearch &nbsp;<i className= 'fas fa-house'></i> 2023</small>
                
        </section>
    </div>
    );
}

export default Footer;