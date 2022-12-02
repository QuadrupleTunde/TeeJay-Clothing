import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.jsx";


export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = (props) =>{
    const [categoriesMap, setCategoriesMap]= useState({})
    useEffect(()=>{
        // addCollectionAndDocuments('categories', SHOP_DATA)
        const getCategoriesMap = async () =>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    }, [])
    const  value  = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>{props.children}</CategoriesContext.Provider>
    )
}