import {useState} from 'react';
import {useAuthContext} from './useAuthContext';
import loginSignupService from '../services/loginSignupService';

export const useLogin = () => {
    const {dispatch} = useAuthContext();
    const [notificationMessage, setNotificationMessage] = useState(''); //use for error or input validation.

    const login = async (email, password) => {
        try{
            const response = await loginSignupService.sendLoginDetails(email, password);
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch({type: 'LOGIN', payload: response.data});
            return 'success';
        }
        catch(error) {
            if (error.response){
                setNotificationMessage('Error occurred, please check again!');
            }
            else setNotificationMessage('Unknown error occurred, please try again.');
        }
        return 'error';
    }

    return {login, notificationMessage, setNotificationMessage};
}