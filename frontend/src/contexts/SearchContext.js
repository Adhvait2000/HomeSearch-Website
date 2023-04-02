import { createContext, useReducer, useEffect } from 'react';

export const SearchContext = createContext([]);

export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return {...state, payload: action.newSearchResults};

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