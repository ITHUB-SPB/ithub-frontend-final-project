import z from 'zod'
import type { Generated } from 'kysely'

import { cartsSchema } from '../schema/carts'


export type CartsTable = z.infer<typeof cartsSchema> & {
    id: Generated<number>
}