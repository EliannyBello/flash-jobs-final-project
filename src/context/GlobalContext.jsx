import React, { createContext, useState, useEffect } from "react";

export const Context = createContext(null)

export const AppContext = ({ children }) => {
    const [store, setStore] = useState({
        apiUrl: '',
        access_token: null,
        user: null,
    });

    const [actions] = useState({
        checkUser: async () => {
            return true
        }
    })
    //estados que estoy usando temporalmente para testear los navbar al estar conectado o modo oscuro-franco
    const [logged, setLogged] = useState(false);
    const [darkMode, setDarkMode] = useState(false);


    useEffect(() => {
        actions.checkUser()
    }, [])

    return (
        <Context.Provider value={{ store, logged, darkMode, actions }}>
            {children}
        </Context.Provider>
    );
}