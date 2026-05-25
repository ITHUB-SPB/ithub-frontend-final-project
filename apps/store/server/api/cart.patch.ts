import z from "zod";
import { db } from "../database/connection";


const cartUpdateSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().nonnegative(),
})

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    const {
        productId,
        quantity,
    } = await readValidatedBody(
        event,
        cartUpdateSchema.parse
    )

    const cartItem = await db
        .selectFrom('carts')
        .innerJoin('products', 'products.id', 'carts.productId')
        .selectAll()
        .where('carts.customerId', '==', user.id)
        .where('carts.productId', '==', productId)
        .executeTakeFirst()

    if (!cartItem) {
        return await db.insertInto('carts').values({
            customerId: user.id,
            productId: productId,
            quantity: quantity
        }).execute()
    }

    if (quantity === 0) {
        return await db.deleteFrom('carts').where('carts.id', '==', cartItem.id).execute()
    }

    return await db.updateTable('carts').set({
        quantity
    }).where('carts.id', '==', cartItem.id).executeTakeFirst()
})


