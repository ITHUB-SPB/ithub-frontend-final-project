import { db } from "../database/connection";

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    return await db
        .selectFrom('carts')
        .innerJoin('products', 'products.id', 'carts.productId')
        .select([
            'products.id' as 'id',
            'products.title' as 'title',
            'carts.quantity' as 'quantity',
            'products.currentPrice' as 'currentPrice'
        ])
        .where('carts.customerId', '==', user.id)
        .execute()
})