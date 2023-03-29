import {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import loginSignupService from '../services/loginSignupService';

export const useSignup = () => {
    const {dispatch} = useAuthContext();
    const [notificationMessage, setNotificationMessage] = useState(''); //use for error or input validation.

    const signup = (name, email, password) => {
        loginSignupService
            .sendSignupDetails(name, email, password, "user")
            .then(response => {
                console.log(response.data);
                localStorage.setItem('user', response.data);
                dispatch({type: 'LOGIN', payload: response.data});
            })
            .catch(error => {
                if (error.response){
                    setNotificationMessage('Error occurred, please check again!');
                }
                else setNotificationMessage('Unknown error occurred, please try again.');
            });
    }

    return {signup, notificationMessage, setNotificationMessage};
}