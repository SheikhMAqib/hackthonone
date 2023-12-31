import { cartTableDrizzle, db } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        let allCartData = await db.select().from(cartTableDrizzle);
        return NextResponse.json({ allCartData })
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
};



export async function POST(req: NextRequest) {
    let request = await req.json();
    try {
        if (request.product_id && request.quantity && request.user_id && request.price) {
            let responce = await db.insert(cartTableDrizzle).values(request).returning();
            return NextResponse.json({ responce })
        } else {
            throw new Error("Please put product_id quantity user_id");

        }
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
}


export async function PUT(req: NextRequest) {
    let request = await req.json();
    try {

        let responce = await db.update(cartTableDrizzle).set(request).
            where(
                and(eq(cartTableDrizzle.product_id, request.product_id), eq(cartTableDrizzle.user_id, request.user_id))
            ).returning();
        return NextResponse.json({ responce })
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
}

export async function DELETE(req: NextRequest) {
    let url = req.nextUrl.searchParams;

    try {
        if (url.has("product_id") && url.has("user_id")) {
            let responce = await db.delete(cartTableDrizzle).
                where(
                    and(eq(cartTableDrizzle.product_id, (url.get("product_id") as string)), eq(cartTableDrizzle.user_id,
                        (url.get("user_id") as string)))
                ).returning();
            return NextResponse.json({ responce })
        }
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
}