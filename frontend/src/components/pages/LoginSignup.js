import React from 'react';
import { useState, useEffect } from 'react';
import './LoginSignup.css';
import LoginBox from '../LoginBox';
import SignupBox from '../SignupBox';


function LoginSignup() {
  const [isLoginBox, setLoginOrSignupBox] = useState(true);

  return (
    <>
    <LoginBox isLoginBox={isLoginBox} setLoginOrSignupBox={setLoginOrSignupBox}/>
    <SignupBox isLoginBox={isLoginBox} setLoginOrSignupBox={setLoginOrSignupBox}/>
    </>
  )
}

export default LoginSignup;