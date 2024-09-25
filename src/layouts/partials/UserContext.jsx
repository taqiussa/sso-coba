import React, { useState, useEffect, createContext, useContext } from 'react';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
        const [user, setUser] = useState(null);

        const login = (userData) => {
                if (userData) {
                        setUser(userData);
                }
        };

        const logout = () => {
                setUser(null);
                localStorage.removeItem('access_token');
        };

        return (
                <UserContext.Provider value={{ user, login, logout }}>
                        {children}
                </UserContext.Provider>
        );
};

export const useUser = () => useContext(UserContext);
