import React, { createContext, useState, useEffect } from "react";
export const Context = createContext(null)
export const AppContext = ({ children }) => {
    const [store, setStore] = useState({
        apiUrl: 'http://127.0.0.1:5000',
        access_token: null,
        user: null,
        JobCards: [],
    });
    //estados que estoy usando temporalmente para testear los navbar al estar conectado o modo oscuro-franco
    const [logged, setLogged] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [actions] = useState({
        checkUser: async () => {
            if (sessionStorage.getItem('access_token')) {
                console.log(sessionStorage.getItem('access_token'))
                setStore((store) => ({
                    ...store,
                    access_token: sessionStorage.getItem('access_token'),
                    user: JSON.parse(sessionStorage.getItem('user'))
                }))
                setLogged(true)
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
                return datos
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
                console.log(datos)
                console.log(response.ok)
                if (response.ok) {
                    setStore((store) => ({
                        ...store, access_token: datos.data.access_token, user: datos.data.user
                    }))
                    console.log(datos.data.user)
                    sessionStorage.setItem('access_token', datos.data.access_token);
                    sessionStorage.setItem('user', JSON.stringify(datos.data.user));
                    setLogged(true);
                    return true;
                }
                return false
            } catch (error) {
                console.log(error.message)
                return false
            }
        },

        jobposting: async (data) => {
            try {
                const { apiUrl } = store
                const response = await fetch(`${apiUrl}/api/job_postings`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const datos = await response.json()
                console.log(datos)
                return datos
            } catch (error) {
                console.log(error.message)
            }
        },

        getjobposting: async (id) => {
            try {
                const { apiUrl } = store

                const response = await fetch(`${apiUrl}/api/job_postings/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const datos = await response.json()
                console.log(datos)
                // setStore({
                //     ...store, user: { ...store.user, JobCards: [...(store.user.JobCards), datos] }
                // });
                console.log(datos)
                return datos
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
                    return datos;
                } else {
                    return false
                }
            } catch (error) {
                console.log(error.message)
            }
        },
        logout: () => {
            sessionStorage?.removeItem('access_token');
            sessionStorage?.removeItem('user');
            setStore(prev => ({ ...prev, user: null, access_token: null }))
            setLogged(false);
        },
        getJobPost: async (id, access_token) => {
            const { apiUrl, currentJobPost } = store
            try {
                const response = await fetch(`${apiUrl}/api/job_postings/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                //modificado para retornar los datos
                return data.job_posting;
            } catch (error) {
                console.log(error.message)
            }
        },
        getUserByid: async (id) => {
            const { apiUrl } = store
            try {
                const response = await fetch(`${apiUrl}/api/profile/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                //modificado para retornar los datos
                return data.user;
            } catch (error) {
                console.log(error.message)
            }
        },
        jobApplication: async (access_token, job_posting_id) => {
            try {
                const { apiUrl } = store
                const body = JSON.stringify({ job_posting_id: job_posting_id })
                const response = await fetch(`${apiUrl}/api/applications`, {
                    method: 'POST',
                    body: body,
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const datos = await response.json()
                console.log(datos)
                return datos

            } catch (error) {
                console.log(error.message)
            }
        },
        getAllJobPosting: async () => {
            const { apiUrl } = store
            try {
                const response = await fetch(`${apiUrl}/api/job_postings`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                return data.job_postings;
            } catch (error) {
                console.log(error.message)
            }
        },
        getApplications: async (id, token) => {
            const { apiUrl } = store
            try {
                const response = await fetch(`${apiUrl}/api/applications/post/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json()
                return data.applications
            } catch (error) {
                console.log(error.message)
                return false
            }
        },
        updateJobCards: async (id, job_posting, token) => {
            try {
                const { apiUrl } = store
                const response = await fetch(`${apiUrl}/api/job_postings/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(job_posting),
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'content-Type': 'application/json'
                    }
                })
                const datos = await response.json();
                console.log(datos);
                return datos
            } catch (error) {
                console.log(error.message);
            }
        },
        acceptApplicant: async (id, token) => {
            const { apiUrl } = store
            try {
                const response = await fetch(`${apiUrl}/api/applications/accept/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const datos = await response.json();
                return datos;
            } catch (error) {
                console.log(error.message)
            }
        },
        rejectApplicant: async (id, token) => {
            const { apiUrl } = store
            try {
                const response = await fetch(`${apiUrl}/api/applications/reject/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const datos = await response.json();
                return datos;
            } catch (error) {
                console.log(error.message)
            }
        },
        getUserApplications: async (id, token) => {
            const { apiUrl } = store;
            try {
                const response = await fetch(`${apiUrl}/api/applications/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                return data.applications;
            } catch (error) {
                console.log(error.message);
                return false;
            }
        },
        createAppRating: async (rating, user_id, application_id) => {
            const { apiUrl } = store;
            try {
                const response = await fetch(`${apiUrl}/api/profile/rank_app`, {
                    method: 'POST',
                    body: JSON.stringify({
                        user_id: user_id,
                        ranking_id: rating,
                        application_id: application_id
                    }),
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
                // Manejo de la respuesta del servidor
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const result = await response.json();
                console.log("Ranking registrado exitosamente:", result);

            } catch (error) {
                console.log("Error al registrar el ranking:", error.message);
            }
        },
        completeJobPost: async (id) => {
            const { apiUrl } = store;
            try {
                const response = await fetch(`${apiUrl}/api/job_postings/complete/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.access_token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                return data;
            }
            catch (error) {
                console.log("Error al completar Job:", error.message);
            }
        },
        rateApplicant: async (user_id, app_id, rate) => {
            const { apiUrl } = store;
            try {
                const response = await fetch(`${apiUrl}/api/profile/rank_app`, {
                    method: 'POST',
                    body: JSON.stringify({
                        ranking_id: rate,
                        application_id: app_id,
                        user_id: user_id
                    }),
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                return data;
            }
            catch (error) {
                console.log("Error al calificar aplicante:", error.message);
            }
        },
        rateJob: async (user_id, job_id, rate) => {
            const { apiUrl } = store;
            try {
                const response = await fetch(`${apiUrl}/api/profile/rank_job`, {
                    method: 'POST',
                    body: JSON.stringify({
                        ranking_id: rate,
                        job_posting_id: job_id,
                        user_id: user_id
                    }),
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                return data;
            }
            catch (error) {
                console.log("Error al calificar trabajo:", error.message);
            }
        }
    })

    useEffect(() => {
        actions.checkUser()
    }, [])
    return (
        <Context.Provider value={{ store, logged, darkMode, actions, setStore }}>
            {children}
        </Context.Provider>
    );
}
