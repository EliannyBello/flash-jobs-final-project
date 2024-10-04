import React, { createContext, useState } from "react";

export const Context = createContext(null)

export const AppContext = ({ children }) => {
    const [store, setStore] = useState({});
    const [logged, setLogged] = useState(false);

    return (
        <Context.Provider value={{ store, logged }}>
            {children}
        </Context.Provider>
    );
}