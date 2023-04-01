import React from 'react';
import { useState, useEffect } from 'react';
import './LoginSignup.css';
import LoginBox from '../LoginBox';
import SignupBox from '../SignupBox';
import {useNavigate} from "react-router-dom";
import {useAuthContext} from '../../hooks/useAuthContext';


function LoginSignup() {
  const [isLoginBox, setLoginOrSignupBox] = useState(true);
  const navigate = useNavigate();
  const {dispatch} = useAuthContext();

  useEffect(() => { //whenever app is first rendered, check if user is in localStorage; if so, login with it.
    const user = localStorage.getItem('user');
    if (user) navigate('/');  
}, [])

  return (
    <>
    <LoginBox isLoginBox={isLoginBox} setLoginOrSignupBox={setLoginOrSignupBox}/>
    <SignupBox isLoginBox={isLoginBox} setLoginOrSignupBox={setLoginOrSignupBox}/>
    </>
  )
}

export default LoginSignup;