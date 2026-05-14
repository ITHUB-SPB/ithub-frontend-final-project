import { v } from "convex/values";
import { query, mutation } from './_generated/server.js'
import type { DataModel } from "./_generated/dataModel.js";

type Product = DataModel["products"]["document"]

export const getByCustomer = query({
    args: {
        customer: v.id("customers")
    },
    handler: async (ctx, args) => {
        const customerCarts = await ctx.db.query('carts')
            .filter(q => q.eq(q.field('customer'), args.customer)).collect()

        const result = []

        for (const { product, quantity } of customerCarts) {
            const { title, current_price: price, _id: sku } = await ctx.db.query('products')
                .filter(q => q.eq(q.field('_id'), product)).first() as Product;

            result.push({
                quantity,
                price,
                sku,
                title
            })
        }

        return result
    }
})

export const updateProduct = mutation({
    args: {
        customer: v.id("customers"),
        product: v.id("products"),
        quantity: v.number(),
    },
    handler: async (ctx, args) => {
        const cart = await ctx.db.query('carts')
            .filter(q => q.eq(q.field('customer'), args.customer))
            .filter(q => q.eq(q.field('product'), args.product))
            .first()

        if (!cart) {
            return await ctx.db.insert('carts', {
                customer: args.customer,
                product: args.product,
                quantity: args.quantity
            })
        }

        if (args.quantity === 0) {
            return await ctx.db.delete('carts', cart._id)
        }

        return await ctx.db.patch('carts', cart._id, {
            quantity: args.quantity
        })
    }
})