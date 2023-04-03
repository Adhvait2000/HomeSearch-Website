import {useAuthContext} from './useAuthContext';

export const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('user-info');
        dispatch({type: 'LOGOUT'});
    }

    return {logout};
}