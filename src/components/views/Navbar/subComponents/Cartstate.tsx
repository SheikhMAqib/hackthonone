import { cartContext } from "@/global/context"
import { useContext } from "react";
import { BsCart2 } from "react-icons/bs"


const Cartstate = () => {
    let { state } = useContext(cartContext);

    return (
        <div className="flex-shrink-0 relative h-11 w-11 bg-gray-300 rounded-full flex items-center justify-center">
            <div className=" w-4 h-4 absolute top-1 right-2 bg-red-400 text-xs rounded-full font-light flex justify-center items-center">
                {state.cart.length}
            </div>
            <BsCart2 size={24} />
        </div>
    )
}

export default Cartstate