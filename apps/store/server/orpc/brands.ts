import z from "zod"
import { ORPCError } from "@orpc/server"

import { base } from "./base"
import { brandsSchema } from "../schema"
import { db } from "../database/connection"

export const list = base
    .input(
        z.object({
            limit: z.number().int().min(1).max(100).default(20),
            offset: z.number().int().min(0).default(0),
        }),
    )
    .handler(async ({ input }) => {
        return await db.selectFrom('brands').selectAll().limit(input.limit).offset(input.offset).execute()
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
    .use(({ context, next }) => {
        // const user = parseJWT(context.headers.authorization?.split(' ')[1])

        // if (user) {
        //     return next({ context: { user } })
        // }

        throw new ORPCError('UNAUTHORIZED')
    })
    .input(brandsSchema.pick({ title: true }))
    .handler(async ({ input, context }) => {
        return await db.insertInto('brands').values({ ...input }).execute()
    })
