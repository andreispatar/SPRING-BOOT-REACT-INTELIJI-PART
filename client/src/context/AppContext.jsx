import { createContext, useEffect } from "react"
import { useState } from "react"
import { fetchCategories } from "../Service/CategoryService.js"


export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const[auth, setAuth] = useState({ token: null, role: null });

    useEffect(() => {
        async function loadData(){
            try {
                const response = await fetchCategories();
                setCategories(response.data);
            } catch (err) {
                console.error('Failed to fetch categories', err);
                setCategories([]); // keep app rendering even if API is down
            }
        }
        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({ token, role });
    }

    const contextValue = {
            categories,
            setCategories,  
            auth,
            setAuthData
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
