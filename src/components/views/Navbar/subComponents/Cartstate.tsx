import { cartContext } from "@/global/context"
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BsCart2 } from "react-icons/bs"


const Cartstate = () => {
    let { cartArray } = useContext(cartContext);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (cartArray.length !== 0) {
            setQuantity(cartArray.length)
        }
    }, [cartArray]);

    return (
        <Link href={"/cart"} className="flex-shrink-0 relative h-11 w-11 bg-gray-300 rounded-full flex items-center justify-center">
            <div className=" w-4 h-4 absolute top-1 right-2 bg-red-400 text-xs rounded-full font-light flex justify-center items-center">
                {quantity}
            </div>
            <BsCart2 size={24} />
        </Link>
    )
}


export default Cartstate