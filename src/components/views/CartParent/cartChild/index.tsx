"use client"
import { imagesType, oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import { cartContext } from "@/global/context"
import Image from "next/image"
import { FC, useContext, useEffect, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import AllProductsCompo from "../../AllProduct"
import { client } from "../../../../../sanity/lib/client"
import imageUrlBuilder from '@sanity/image-url'


const builder: any = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source)
}


const CartComp = ({ allProductsOfStore }: { allProductsOfStore: Array<oneProductType> }) => {
    const [allProductsForCart, setAllProductsForCart] = useState<any>();
    let { userData, cartArray, dispatch } = useContext(cartContext)

    function handleRemove(product_id: string) {
        if (userData) {
            let user_id = userData.uuid;
            dispatch("removeFromCart", { product_id, user_id })
        }
    }
    useEffect(() => {

        if (cartArray.length !== 0) {
            let data = allProductsOfStore.filter((item: oneProductType) => {
                for (let index = 0; index < cartArray.length; index++) {
                    let element: any = cartArray[index];
                    if (element.product_id === item._id) {
                        return true
                    };
                };
            });
            setAllProductsForCart(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartArray])



    return (

        <div className="py-10 px-4 md:px-10">
            {/* first  */}
            <div className="py-6 gap-6">
                <h1 className="text-2xl font-semibold text-gray-800">Shopping Cart</h1>
            </div>

            {/* secound */}

            < div className=" flex flex-col lg:flex-row gap-6">


                <div className=" flex flex-col basis-[69%] gap-2">
                    {
                        allProductsForCart?.map((item: oneProductType, index: number) => (
                            <div key={index} className=" flex flex-shrink-0  gap-6 ">
                                <div className="w-[14rem]">
                                    <Image className="rounded-xl" width={1000} height={1000} src={urlFor(item.image[0]).width(1000).height(1000).url()} alt={item.image[0].alt} />
                                </div>
                                <div className=" space-y-1 md:space-y-3 w-full ">
                                    <div className="flex justify-between">
                                        <h2 className="md:text-2xl font-light text-gray-700" >{item.productName}</h2>
                                        <div onClick={() => { handleRemove(item._id) }}>
                                            < RiDeleteBin6Line size={28} />
                                        </div>
                                    </div>
                                    <p className="text-gray-400 font-medium">{item.productTypes[1] ? item.productTypes[1] : "All"}</p>
                                    <h3 className="text-sm md:text-base" >Delivery Estimation</h3>
                                    <h4 className="text-orange-400 font-semibold  md:text-xl:" >5 Working Days</h4>
                                    <div className="flex justify-between">
                                        <p className="font-semibold md:text-lg">{"$"}{item.price}</p>
                                        <div className="flex gap-2 items-center text lg">
                                            <div className="select-none cursor-pointer flex justify-center w-8 h-8 rounded-full bg-gray-200">-</div>
                                            <p>5</p>
                                            <div className=" select-none cursor-pointer flex justify-center w-8 h-8 rounded-full border  border-gray-800">+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className="basis-1/4 space-y-6  px-6">
                    <h6 className="font-semibold text-xl ">Order Summary</h6>
                    <div className="flex justify-between ">
                        <p className="text-lg font-light">Quantity:</p>
                        <p>3 Products</p>
                    </div>
                    <div className="flex justify-between ">
                        <p className="text-lg font-light">Subtotal:</p>
                        <p>$550</p>
                    </div>
                    <button className="text-white bg-gray-900 border border-gray-500 px-4 py-2 w-full">Process to Checkout</button>
                </div>
            </div>

        </div >


    )
}

export default CartComp




