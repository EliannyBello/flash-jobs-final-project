import React, { createContext, useState, useEffect } from "react";

export const Context = createContext(null)

export const AppContext = ({ children }) => {
    const [store, setStore] = useState({
        access_token:null,
        user: null,
    });
    //estado que estoy usando temporalmente para testear los navbar al estar conectado o no -franco
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        
    }, [])

    return (
        <Context.Provider value={{ store, logged }}>
            {children}
        </Context.Provider>
    );
}