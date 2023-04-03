import { createContext, useReducer, useEffect } from 'react';

export const SearchContext = createContext(null);

export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return {...state, searchResults: action.payload};

        case 'RESET':
            return {...state, searchResults: null};

        default:
            return state;
    }
}

export const SearchContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(searchReducer, {
        searchResults: null
    })

    return (
        <SearchContext.Provider value={{...state, dispatch}}>
            { children }
        </SearchContext.Provider>
    )
}