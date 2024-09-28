import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
        const [user, setUser] = useState(null);

        useEffect(() => {
                const storedUser = JSON.parse(sessionStorage.getItem('user_profile'));
                if (storedUser) {
                        setUser(storedUser);
                }
        }, []);

        const login = (userData) => {
                setUser(userData);
                sessionStorage.setItem('user_profile', JSON.stringify(userData));
        };

        const logout = () => {
                setUser(null);
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                sessionStorage.removeItem('user_profile');
        };

        return (
                <UserContext.Provider value={{ user, login, logout }}>
                        {children}
                </UserContext.Provider>
        );
};

export const useUser = () => useContext(UserContext);
