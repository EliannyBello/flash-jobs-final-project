import React, { createContext, useState, useEffect } from "react";


export const Context = createContext(null)



export const AppContext = ({ children }) => {
    const [store, setStore] = useState({
        apiUrl: 'http://127.0.0.1:5000',
        access_token: null,
        user: null,
        JobCards: []
    });




    //estados que estoy usando temporalmente para testear los navbar al estar conectado o modo oscuro-franco
    const [logged, setLogged] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const [actions] = useState({
        checkUser: async () => {
            if (sessionStorage.getItem('access_token') == !undefined) {
                console.log(sessionStorage.getItem('access_token'))
                setStore((store) => ({
                    ...store,
                    access_token: sessionStorage.getItem('access_token'),
                    user: JSON.parse(sessionStorage.getItem('user'))
                }))
            }
        },

        register: async (credentials) => {
            try {
                const { apiUrl } = store
                const response = await fetch(`${apiUrl}/api/register`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const datos = await response.json()

                console.log(datos)


            }
            catch (error) {
                console.log(error.message)
            }
        },

        login: async (credentials) => {
            try {
                const { apiUrl } = store
                const response = await fetch(`${apiUrl}/api/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const datos = await response.json()
                console.log(datos.data)
                console.log(response.ok)


                setStore((store) => ({
                    ...store, access_token: datos.data.access_token, user: datos.data.user
                }))
                sessionStorage.setItem('access_token', datos.data.access_token);
                sessionStorage.setItem('user', JSON.stringify(datos.data.user));


                setLogged(true);
                return true;


            } catch (error) {
                console.log(error.message)
                return false
            }
        },

        jobposting: async (credentials) => {
            try {
                const { apiUrl } = store
                const response = await fetch(`${apiUrl}/api/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const datos = await response.json()

                console.log(datos)

            } catch (error) {
                console.log(error.message)
            }
        },
        updateProfile: async (formData, access_token) => {
            try {
                const { apiUrl } = store
                console.log(access_token)
                const response = await fetch(`${apiUrl}/api/profile`, {
                    method: 'PATCH',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                const datos = await response.json()

                console.log(datos)
                if (datos.status === 'success') {
                    setStore((store) => ({ ...store, user: datos.user }))
                    sessionStorage.setItem('user', JSON.stringify(datos?.user))
                    return true
                } else {
                    return false
                }

            } catch (error) {
                console.log(error.message)
            }
        },
        logout: () => {
            console.log('log out')
            sessionStorage?.removeItem('access_token');
            sessionStorage?.removeItem('user');
            setStore({ user: null, access_token: null })
            setLogged(false);
        }
    }
    )



    useEffect(() => {
        actions.checkUser()
        if (sessionStorage.getItem('user')) {
            setLogged(true)
        }
    }, [])

    return (
        <Context.Provider value={{ store, logged, darkMode, actions }}>
            {children}
        </Context.Provider>
    );

}