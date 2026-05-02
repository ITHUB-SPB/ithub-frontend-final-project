import { v } from "convex/values";
import { query, mutation } from './_generated/server.js'

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('products').collect()
    }
})

export const create = mutation({
    args: {
        brand: v.id("brands"),
        category: v.id("categories"),
        current_price: v.number(),
        raw_price: v.number(),
        title: v.string(),
        description: v.nullable(v.string())
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("products", { ...args })
    }
})
