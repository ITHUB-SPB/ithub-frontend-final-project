import { v } from "convex/values";
import { query, mutation } from './_generated/server'

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('brands').collect()
    }
})

export const create = mutation({
    args: {
        title: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('brands', { title: args.title })
    }
})