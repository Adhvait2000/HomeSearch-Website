import { createContext, useReducer, useEffect } from 'react';

export const SearchContext = createContext([]);


///////change the below stuff!!!!!!!


export const authReducer = (currentSearchResult, action) => {
    switch (action.type) {
        case 'NEW_SEARCH':
            return [action.newSearchResult];

        default:
            return currentSearchResult;
    }
}

export const SearchContextProvider = ({children}) => {
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