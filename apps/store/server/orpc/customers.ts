import { v } from "convex/values";
import { query } from './_generated/server.js'
import { mutation } from "./_generated/server.js";

export const getByEmail = query({
    args: {
        email: v.string()
    },
    handler: async (ctx, args) => await ctx.db.query('customers')
        .filter(q => q.eq(q.field('email'), args.email)).first()
})

export const create = mutation({
    args: {
        email: v.string(),
        password: v.string()
    },
    handler: async (ctx, { email, password }) => await ctx.db.insert('customers', {
        email, password, phone: '', full_name: null, address: null
    })
})