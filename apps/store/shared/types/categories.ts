import z from 'zod'
import { type Generated } from 'kysely'

import { categoriesSchema } from '../schema/categories'


export type CategoriesTable = z.infer<typeof categoriesSchema> & {
    id: Generated<number>
}