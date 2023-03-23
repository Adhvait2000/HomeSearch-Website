import React, { useState,useEffect} from 'react';
import { Button } from './Button';
import{Link} from 'react-router-dom';
import './Navbar.css';
import { dom } from '@fortawesome/fontawesome-svg-core'

dom.watch() // This will kick off the initial replacement of i to svg tags and configure a MutationObserver
//import { faXmark, faBars, faCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar(){
    const[click,setClick]=useState(false);
    const [button,setButton]=useState(true);
    const handleClick=()=> setClick(!click);
    const closeMobileMenu=()=> setClick(false);

    const showButton=()=>{
        if(window.innerWidth<=960){
            setButton(false);
        }else{
           setButton(true); 
        }
    };

    useEffect(()=>{
        showButton()
    },[]);
    window.addEventListener('resize',showButton);

    return(
        <>
        <nav className='Navbar'>
            <div className='navbar-container'>
                
                <Link to='/' className="navbar-logo">
                    Homesearch &nbsp; <i className= 'fas fa-house'></i>
            
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                    </li>
                
                    <li className='nav-item'>
                    <Link to='/GuidesArticles' className='nav-links' onClick={closeMobileMenu}>
                        Guides and Articles
                    </Link>
                    </li>
                    <li className='nav-item'>
                    <Link to='/Help' className='nav-links' onClick={closeMobileMenu}>
                        Help
                    </Link>
                    </li>
                    <li className='nav-item'>
                    <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                        Sign Up
                    </Link>
                    </li>
                </ul>
                {button && <Button buttonStyle='btn--outline'>LOG IN</Button>}
            </div>
        </nav>
        </>
    )

}

export default Navbar;