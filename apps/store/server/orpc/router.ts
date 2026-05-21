import { RequestHeadersPluginContext } from '@orpc/server/plugins'
import { ORPCError, os } from '@orpc/server'
import { getCookie } from '@orpc/server/helpers'

import * as z from 'zod'


interface ORPCContext extends RequestHeadersPluginContext { }

const PlanetSchema = z.object({
    id: z.number().int().min(1),
    name: z.string(),
    description: z.string().optional(),
})

const base = os.$context<ORPCContext>()

const brandRouter = {
    list: base
        .input(
            z.object({
                limit: z.number().int().min(1).max(100).optional(),
                cursor: z.number().int().min(0).default(0),
            }),
        )
        .handler(async ({ input }) => {
            // your list code here
            return [{ id: 1, name: 'name' }]
        }),
    find: base
        .input(PlanetSchema.pick({ id: true }))
        .handler(async ({ input }) => {
            // your find code here
            return { id: 1, name: 'name' }
        }),
    create: base
        .use(({ context, next }) => {
            // const user = parseJWT(context.headers.authorization?.split(' ')[1])

            // if (user) {
            //     return next({ context: { user } })
            // }

            throw new ORPCError('UNAUTHORIZED')
        })
        .input(PlanetSchema.omit({ id: true }))
        .handler(async ({ input, context }) => {
            // your create code here
            return { id: 1, name: 'name' }
        })
}


// export const get = query({
//     args: {},
//     handler: async (ctx) => {
//         return await ctx.db.query('brands').collect()
//     }
// })

// export const getByTitle = query({
//     args: {
//         title: v.string()
//     },
//     handler: async (ctx, args) => {
//         return await ctx.db.query('brands').filter(q => q.eq(q.field('title'), args.title)).first()
//     }
// })

// export const create = mutation({
//     args: {
//         title: v.string()
//     },
//     handler: async (ctx, args) => {
//         return await ctx.db.insert('brands', { title: args.title })
//     }
// })

export const router = {
    brand: brandRouter
}
