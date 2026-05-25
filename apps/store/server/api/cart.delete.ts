import { db } from "../database/connection";

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    return await db
        .deleteFrom('carts')
        .innerJoin('products', 'products.id', 'carts.productId')
        .where('carts.customerId', '==', user.id)
        .execute()
})