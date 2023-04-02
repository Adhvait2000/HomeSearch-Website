import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        
        case 'LOGOUT':
            return {...state, user: null}

        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => { //whenever app is first rendered, check if user is in localStorage; if so, login with it.
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) dispatch({type: 'LOGIN', payload: user});
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}