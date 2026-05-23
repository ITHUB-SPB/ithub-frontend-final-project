import { base } from "./base"
import { characteristicsSchema } from "../schema"
import { db } from "../database/connection"


export const list = base
    .handler(async ({ input }) => {
        return await db.selectFrom('characteristics').selectAll().execute()
    })

export const create = base
    .input(characteristicsSchema.omit({ id: true }))
    .handler(async ({ input, context }) => {
        return await db.insertInto('characteristics').values({ ...input }).execute()
    })
