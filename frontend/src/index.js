import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { SearchContextProvider } from './contexts/SearchContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <AuthContextProvider>
        <SearchContextProvider>
            <App />
        </SearchContextProvider>
    </AuthContextProvider>
);

