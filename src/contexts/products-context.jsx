import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json'

export const ProductsContext = createContext({
    products: []
});

export const ProductsProvider = ({Children}) =>{
    const [products, setProducts]= useState(PRODUCTS)
    const  value  = {products}
    return(
        <ProductsContext.Provider value={value}>{Children}</ProductsContext.Provider>
    )
}