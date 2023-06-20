"use client"
import { ReactNode, createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer";

export const cartContext = createContext<any>(null);

const ContextWrapper = ({ children }: { children: ReactNode }) => {

    const iniatizilerOfCart = {
        cart: [
            {
                ProductId: "",
                Quantity: 2,
            }
        ],
    }

    const [state, dispatch] = useReducer(cartReducer, iniatizilerOfCart)
    useEffect(() => {

        localStorage.setItem("cartstate", JSON.stringify(state));
    }, [state])


    return (

        <cartContext.Provider value={{ state, dispatch }}>
            {children}
        </cartContext.Provider>
    )
}

export default ContextWrapper