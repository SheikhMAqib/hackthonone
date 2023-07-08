import { cartTableDrizzle, db } from "@/lib/drizzle";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        let allCartData = await db.select().from(cartTableDrizzle);
        return NextResponse.json({ allCartData })
    } catch (error) {
        console.log("error : ", (error as { message: string }).message)
        return NextResponse.json({ error })
    }
};