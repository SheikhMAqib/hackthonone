import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";

interface typeOfData {
    price: string,
    name: string,
    quantity: number,

}


let originalData: Array<typeOfData> = [
    {
        price: 'price_1NSkzlEEdSo0TBzmjHA6BMvu',
        name: 'Pink Fleece Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NSl0YEEdSo0TBzmlVxZ26Gb',
        name: 'Raglan Sweatshirt',
        quantity: 1,
    },
    {
        price: 'price_1NSl1SEEdSo0TBzm6GlnBQvT',
        name: 'Lite Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NSl2JEEdSo0TBzmZhT4qrZ5',
        name: 'Brushed Raglan Sweatshirt',
        quantity: 1,
    },
    {
        price: 'price_1NSl39EEdSo0TBzmmYDNE9WD',
        name: 'Imperial Alpaca Hoodie',
        quantity: 1,
    },
    {
        price: 'price_1NSl4kEEdSo0TBzmWqkGgzME',
        name: 'Cameryn Sash Tie Dress',
        quantity: 1,
    },
    {
        price: 'price_1NSl5ZEEdSo0TBzmmieYmyTo',
        name: 'Flex Sweatshirt',
        quantity: 1,
    },
    {
        price: 'price_1NSl6SEEdSo0TBzmpa2z39sA',
        name: 'Flex Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NSl97EEdSo0TBzmNj6n4L52',
        name: 'Flex Push Button Bomber',
        quantity: 1,
    },
]

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    let cartItemsArray = await req.json();

    try {
        let line_item = originalData.filter((item: typeOfData) => {
            for (let index = 0; index < cartItemsArray.length; index++) {
                const element: oneProductType = cartItemsArray[index];
                if (element.productName === item.name) {
                    return true
                }
            }
        })
        let line_itemToSent = line_item.map((item: typeOfData) => {
            return {
                price: item.price,
                quantity: item.quantity
            }
        })


        let session = await stripe.checkout.sessions.create({
            line_items: line_itemToSent,
            mode: "payment",
            success_url: `${req.nextUrl.origin}/?success=true`,
            cancel_url: `${req.nextUrl.origin}/?success=false`

        })
        return NextResponse.json({ link: session.url });
    } catch (error) {
        console.log((error as { message: string }).message)
        return NextResponse.json({ error })

    }
}