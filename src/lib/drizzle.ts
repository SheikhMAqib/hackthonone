import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { InferModel } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const cartTableDrizzle = pgTable("cart", {
    product_id: varchar("product_id"),
    quantity: integer("quantity"),
    user_id: varchar("user_id"),
    price: integer("price"),

});


export type typeOfCartTable = InferModel<typeof cartTableDrizzle>;

export const db = drizzle(sql);

