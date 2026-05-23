import z from "zod"
import { ORPCError } from "@orpc/server"

import { base } from "./base"
import { productsSchema } from "../schema"
import { db } from "../database/connection"

export const list = base
    .input(
        z.object({
            limit: z.number().int().min(1).max(100).default(20),
            offset: z.number().int().min(0).default(0),
        }),
    )
    .handler(async ({ input }) => {
        return await db.selectFrom('products').selectAll().limit(input.limit).offset(input.offset).execute()
    })

export const create = base
    .input(productsSchema.omit({ id: true }))
    .handler(async ({ input, context }) => {
        return await db.insertInto('products').values({ ...input }).execute()
    })
