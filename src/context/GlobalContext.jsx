import React, { createContext, useState } from "react";

export const Context = createContext(null)

export const AppContext = ({ children }) => {
    const [store, setStore] = useState({
        access_token:null,
        user: null,
    });
    const [logged, setLogged] = useState(false);



    useEffect

    return (
        <Context.Provider value={{ store, logged }}>
            {children}
        </Context.Provider>
    );
}