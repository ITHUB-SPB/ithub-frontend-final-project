import { z } from "zod";
import { db } from "../database/connection";
import { getValidatedQuery } from "#imports";

const productsSchema = z.object({
    limit: z.string().transform(Number).pipe(z.number().int().min(1).max(100)),
    offset: z.string().transform(Number).pipe(z.number().int().min(0)),
})

export default defineEventHandler(async (event) => {
    const {
        limit,
        offset,
    } = await getValidatedQuery(
        event,
        productsSchema.parse
    )

    return await db.selectFrom('products').selectAll().limit(limit).offset(offset).execute()
})