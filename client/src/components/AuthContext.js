import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    const login = (profile) => {
        setUserProfile(profile);
    };

    const logout = () => {
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ userProfile, login, logout, isAuthenticated: !!userProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
