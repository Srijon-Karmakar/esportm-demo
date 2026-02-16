import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext(null);

// Create the provider component
export const UserProvider = ({ children }) => {
    const [username, setUsername ] = useState(localStorage.getItem('username') || '');

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};