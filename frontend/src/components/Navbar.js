import React, { useState,useEffect} from 'react';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';
import{Link} from 'react-router-dom';
import './Navbar.css';
import { dom } from '@fortawesome/fontawesome-svg-core';
import { useAuthContext } from '../hooks/useAuthContext';

dom.watch() // This will kick off the initial replacement of i to svg tags and configure a MutationObserver
//import { faXmark, faBars, faCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar(){
    const[click,setClick]=useState(false);
    const [button,setButton]=useState(true);
    const handleClick=()=> setClick(!click);
    const closeMobileMenu=()=> setClick(false);

    const {user} = useAuthContext();

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
                    
                    {user && <li className='nav-item'>
                    <Link to='/search' className='nav-links' onClick={closeMobileMenu}>
                        Search Houses
                    </Link>
                    </li>
                    }
                    
                    {user && <li className='nav-item'>
                    <Link to='/price-estimator' className='nav-links' onClick={closeMobileMenu}>
                        Price Estimator
                    </Link>
                    </li>
                    }

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

                    {user &&
                        <li className='nav-item'>
                            <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li>
                    }
                    
                    <li className='nav-item'>
                    <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                        Sign Up
                    </Link>
                    </li>
                </ul>
                {(button && !user) && <LoginButton buttonStyle='btn--outline'>LOG IN</LoginButton>}
                {(button && user) && <LogoutButton buttonStyle='btn--outline'>LOG OUT</LogoutButton>}
            </div>
        </nav>
        </>
    )

}

export default Navbar;