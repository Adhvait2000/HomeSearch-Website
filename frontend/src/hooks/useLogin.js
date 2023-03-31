import {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import loginSignupService from '../services/loginSignupService';

export const useLogin = () => {
    const {dispatch} = useAuthContext();
    const [notificationMessage, setNotificationMessage] = useState(''); //use for error or input validation.

    const login = (email, password) => {
        loginSignupService
            .sendLoginDetails(email, password)
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

    return {login, notificationMessage, setNotificationMessage};
}