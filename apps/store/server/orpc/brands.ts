import z from "zod"

import { base } from "./base"
import { brandsSchema } from "../schema"
import { db } from "../database/connection"

export const list = base
    .handler(async () => {
        return await db.selectFrom('brands').selectAll().execute()
    })

export const find = base
    .input(
        z.object({
            by: z.union([z.literal('id'), z.literal('title')]),
            value: z.union([z.string().min(2), z.number().int().positive()])
        })
    )
    .handler(async ({ input }) => {
        if (input.by === 'id') {
            return await db.selectFrom('brands').selectAll()
                .where('brands.id', '==', Number(input.value)).executeTakeFirst()
        }

        return await db.selectFrom('brands').selectAll()
            .where('brands.title', 'is', String(input.value)).executeTakeFirst()
    })

export const create = base
    .input(brandsSchema.pick({ title: true }))
    .handler(async ({ input, context }) => {
        return await db.insertInto('brands').values({ ...input }).execute()
    })
