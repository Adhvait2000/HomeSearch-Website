import {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import loginSignupService from '../services/loginSignupService';

export const useSignup = () => {
    const {dispatch} = useAuthContext();
    const [notificationMessage, setNotificationMessage] = useState(''); //use for error or input validation.

    const signup = async (name, email, password) => {
      try { //try to login using login service; set user token in localStorage as cookie, dispatch login to authcontext, return success        
        const response = await loginSignupService.sendSignupDetails(name, email, password, "user");
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({type: 'LOGIN', payload: response.data});
        return 'success';
      } 
      catch (error) { //set error message for displaying, return error
        if (error.response){
          setNotificationMessage('Error occurred, please check again!');
        } else {
          setNotificationMessage('Unknown error occurred, please try again.');
        }
        return 'error';
      }
}

    return {signup, notificationMessage, setNotificationMessage};
}