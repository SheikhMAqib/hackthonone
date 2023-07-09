"use client"
import { ReactNode, createContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../reducer";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import BASE_PATH_FORAPI from "@/components/shared/BasePath";

export const cartContext = createContext<any>(null);

interface indexForError {
    [key: string]: string
};


const ContextWrapper = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [userData, setUserData] = useState<any>()
    const [errorViaUserCredential, setErrorViaUserCredential] = useState<indexForError | "">("")
    const [loading, setLoading] = useState(false);
    const [cartArray, setCartArray] = useState<any>([])
    const [errorsOfFirebase, setErrorsOfFirebase] = useState({
        key: "",
        errorMessage: ""
    })


    async function fetchApiForAllCartItems() {
        let res = await fetch(`${BASE_PATH_FORAPI}/api/cartfunc`);
        if (!res.ok) {
            throw new Error("Failed to fetch");
        }
        let dataToReturn = await res.json()
        setCartArray(dataToReturn.allCartData);
    };

    useEffect(() => {
        fetchApiForAllCartItems();
    }, []);

    async function dispatch(payload: string, data: any) {
        if (payload === "addToCart") {
            console.log("func running of add to cart");
            await fetch(`${BASE_PATH_FORAPI}/api/cartfunc`, {
                method: "POST",
                body: JSON.stringify(data)
            });
        } else if (payload === "removeFromCart") {
            console.log("func running remove from  cart");
            let dataa = await fetch(`${BASE_PATH_FORAPI}/api/cartfunc?product_id=${data.product_id}&user_id=${data.user_id}`, {
                method: "DELETE",
            });
            let Notdata = await dataa.json();
        } else if (payload === "updateCart") {
            console.log("func running update cart");
            let dataa = await fetch(`${BASE_PATH_FORAPI}/api/cartfunc`, {
                method: "PUT",
                body: JSON.stringify(data)
            });
            let Notdata = await dataa.json();
        }
        fetchApiForAllCartItems();
    }

    let user = auth.currentUser;

    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUserData({
                    displayName: user.displayName,
                    email: user.email,
                    uuid: user.uid,
                    photoUrl: user.photoUrl,
                    emailVerified: user.emailVerified,
                })
            } else {
                setUserData(null);
            }
        });
    }, [])


    let provider = new GoogleAuthProvider()

    function signUpViaGoogle() {
        setLoading(true)
        return signInWithPopup(auth, provider).then((userData: any) => {
            if (userData) {
                setUserData({
                    displayName: userData.user.displayName,
                    email: userData.user.email,
                    uuid: userData.user.uid,
                    photoUrl: userData.user.photoUrl,
                    emailVerified: userData.user.emailVerified,
                });
                router.push("/");
            }
            setLoading(false)
        })
    }

    function signUpUser(email: string, password: string) {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password).then((res: any) => {
            setLoading(false);
            router.push("/");
        }).catch((res: any) => {
            let error = res.code.split("/")
            error = error[error.length - 1];
            setErrorsOfFirebase({
                key: "Error occurred while signing up",
                errorMessage: error,
            })
            setLoading(false)
        });
        setLoading(false);

    }


    function signInUser(email: string, password: string) {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password).then((res: any) => {
            setLoading(false);
        }).catch((res: any) => {
            let error = res.code.split("/")
            error = error[error.length - 1];
            setErrorsOfFirebase({
                key: "Error occurred while signing in",
                errorMessage: error,
            })

        });
        setLoading(false);
    }

    function LogOut() {
        setLoading(true);
        signOut(auth);
        setLoading(false);
        window.location.reload()
    };

    function sendEmailVerificationCode() {
        setLoading(true);
        if (user) {
            sendEmailVerification(user).then((res: any) => {
                console.log("sending")
                window.location.href = "/"
            })
            setLoading(false);
        }
    }

    function updateUserNamePhoto(userName: string, photoURL?: string) {
        setLoading(true);
        if (user) {
            updateProfile(user, {
                displayName: userName, photoURL: "https://resume-cv-sheikhmaqib.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-poster.81745560.jpg&w=640&q=75"
            }).then(() => {
                setLoading(false);
            }).catch((error: any) => {
                setLoading(false);
                console.log(error)
            });
        }
    }


    return (
        <cartContext.Provider value={{ cartArray, dispatch, errorsOfFirebase, updateUserNamePhoto, userData, sendEmailVerificationCode, signUpUser, signUpViaGoogle, signInUser, LogOut, loading }}>
            {children}
        </cartContext.Provider>
    )
}

export default ContextWrapper