import { v } from "convex/values";
import { query, mutation } from './_generated/server.js'

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('characteristics').collect()
    }
})

export const create = mutation({
    args: {
        title: v.string(),
        measure: v.nullable(v.string())
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('characteristics', { ...args })
    }
})