import { v } from "convex/values";
import { query, mutation } from './_generated/server.js'

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query('categories').collect()
    }
})

export const getByTitle = query({
    args: {
        title: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.query('categories').filter(q => q.eq(q.field('title'), args.title)).first()
    }
})

export const create = mutation({
    args: {
        title: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('categories', { title: args.title })
    }
})