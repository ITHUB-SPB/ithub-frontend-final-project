import z from "zod"
import { ORPCError } from "@orpc/server"

import { base } from "./base"
import { cartsSchema } from "../schema"
import { db } from "../database/connection"


export const list = base
    .input(
        z.object({
            limit: z.number().int().min(1).max(100).default(20),
            offset: z.number().int().min(0).default(0),
            customerEmail: z.optional(z.email())
        }),
    )
    .handler(async ({ input }) => {
        let query = db.selectFrom('carts').innerJoin('customers', 'customers.id', 'carts.customerId').selectAll()

        if (input.customerEmail) {
            query = query.where('customers.email', '==', input.customerEmail)
        }

        const carts = await query.limit(input.limit).offset(input.offset).execute()

        const result = []

        for (const { productId, quantity } of carts) {
            const { title, currentPrice: price, id: sku } = await db.selectFrom('products')
                .selectAll()
                .where('products.id', '==', productId)
                .executeTakeFirstOrThrow()

            result.push({
                quantity,
                price,
                sku,
                title
            })
        }

        return result
    })


export const clear = base
    .input(
        z.object({
            customerEmail: z.email()
        }),
    )
    .handler(async ({ input }) => {
        const customer = await db
            .selectFrom('customers')
            .selectAll()
            .where('customers.email', '==', input.customerEmail)
            .executeTakeFirstOrThrow()

        const customerCarts = await db.selectFrom('carts')
            .selectAll()
            .where('carts.customerId', '==', customer.id)
            .execute()

        for (const { id } of customerCarts) {
            await db.deleteFrom('carts').where('carts.id', '==', id).execute()
        }
    })


export const update = base
    .input(
        z.object({
            customerEmail: z.email(),
            productId: z.number().int().positive(),
            quantity: z.number().int().nonnegative(),
        }),
    )
    .handler(async ({ input }) => {
        const customer = await db
            .selectFrom('customers')
            .selectAll()
            .where('customers.email', '==', input.customerEmail)
            .executeTakeFirstOrThrow()

        const cart = await db.selectFrom('carts')
            .selectAll()
            .where('carts.customerId', '==', customer.id)
            .where('carts.productId', '==', input.productId)
            .executeTakeFirst()

        if (!cart) {
            return await db.insertInto('carts').values({
                customerId: customer.id,
                productId: input.productId,
                quantity: input.quantity
            }).execute()
        }

        if (input.quantity === 0) {
            return await db.deleteFrom('carts').where('carts.id', '==', cart.id).execute()
        }

        return await db.updateTable('carts').set({
            quantity: input.quantity
        }).where('carts.id', '==', input.quantity).executeTakeFirst()
    })
