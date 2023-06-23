import { cartContext } from "@/global/context"
import { useContext, useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs"


const Cartstate = () => {
    const [quantity, setQuantity] = useState(0);
    const isBrowser = () => typeof window !== undefined;

    useEffect(() => {
        if (isBrowser()) {
            let data = localStorage.getItem("cart") as string;
            setQuantity(JSON.parse(data).length)
        }
    }, []);
    return (
        <div className="flex-shrink-0 relative h-11 w-11 bg-gray-300 rounded-full flex items-center justify-center" >
            <div className=" w-4 h-4 absolute top-1 right-2 bg-red-400 text-xs rounded-full font-light flex justify-center items-center">
                {quantity}
            </div>
            <BsCart2 size={24} />
        </div >
    )
}


export default Cartstate