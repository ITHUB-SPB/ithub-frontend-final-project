import z from 'zod'
import type { Generated } from 'kysely'

import { characteristicsSchema } from '../schema/characteristics'
import { productsCharacteristicsSchema } from '../schema/characteristics'


export type CharacteristicsTable = z.infer<typeof characteristicsSchema> & {
    id: Generated<number>
}

export type ProductsCharacteristicsTable = z.infer<typeof productsCharacteristicsSchema> & {
    id: Generated<number>,
}
