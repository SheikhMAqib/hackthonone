"use client"
import { ReactNode, createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const cartContext = createContext<any>(null);

const ContextWrapper = ({ children }: { children: ReactNode }) => {

    const iniatizilerOfCart = {
        cart: [],
    }

    const [state, dispatch] = useReducer(cartReducer, iniatizilerOfCart)
    useEffect(() => {
        let cart = localStorage.getItem("cart") as string;
        if (cart === null) {
            localStorage.setItem("cart", JSON.stringify(state.cart));
        } else {
            iniatizilerOfCart.cart = JSON.parse(cart)
        }
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(state.cart))
    }, [state.cart])



    function signUpUser(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }


    function signInUser(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function Logout() {
        signOut(auth)
    }



    return (

        <cartContext.Provider value={{ state, dispatch }}>
            {children}
        </cartContext.Provider>
    )
}

export default ContextWrapper