"use client"
import { imagesType, oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import { FC, useState } from "react"
import { client } from "../../../../sanity/lib/client";
import Image from "next/image";
import imageUrlBuilder from '@sanity/image-url'



const builder: any = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source)
}

const ProductDetail: FC<{ item: oneProductType }> = ({ item }) => {
    const [imageForPreviewOfSelected, setImageForPreviewOfSelected] = useState<string>(item.image[0]._key);
    console.log("_key :", imageForPreviewOfSelected)
    return (
        <div>
            {/* left */}
            <div className="flex gap-x-4 md:gap-x-8">
                {/* left */}
                <div className="space-y-4">
                    {
                        item.image.map((subItem: imagesType, index: number) => (
                            <div key={index} className="w-16 md:w-24" onClick={() => setImageForPreviewOfSelected(subItem._key)}>
                                <Image width={1000} height={1000} alt={subItem.alt} src={urlFor(subItem).width(1000).height(1000).url()} />
                            </div>
                        ))
                    }
                </div>
                {/* right  */}
                <div className="w-[33rem] flex flex-wrap-0">
                    {item.image.map((subItem: imagesType, index: number) => {
                        if (subItem._key === imageForPreviewOfSelected) {

                            return (

                                < Image width={1000} height={1000} alt={subItem.alt} src={urlFor(subItem).width(1000).height(1000).url()} key={index} />
                            )
                        }
                    })}


                </div>
                {/* right */}
            </div>
            <div></div>
        </div>
    )
}

export default ProductDetail
