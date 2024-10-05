import React, { createContext, useState, useEffect } from "react";

export const Context = createContext(null)

export const AppContext = ({ children }) => {
    const [store, setStore] = useState({
        access_token: null,
        user: null,
    });
    //estados que estoy usando temporalmente para testear los navbar al estar conectado o modo oscuro-franco
    const [logged, setLogged] = useState(false);
    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {

    }, [])

    return (
        <Context.Provider value={{ store, logged, darkMode }}>
            {children}
        </Context.Provider>
    );
}