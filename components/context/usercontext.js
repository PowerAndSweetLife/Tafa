import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [Monprofil, setMonprofil] = useState(null); // Pour stocker les données de l'utilisateur

    return (
        <UserContext.Provider value={{ Monprofil, setMonprofil }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
