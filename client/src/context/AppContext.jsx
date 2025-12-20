import { createContext, useEffect } from "react"
import { useState } from "react"
import { fetchCategories } from "../Service/CategoryService.js"


export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        async function loadData(){
            const response = await fetchCategories();
            setCategories(response.data);
        }
        loadData();
    }, []);

    const contextValue = {
            categories,
            setCategories  
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}