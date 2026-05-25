import z from 'zod'
import type { Generated, Selectable } from 'kysely'

import { customersSchema } from '../schema/customers'

export type CustomersTable = z.infer<typeof customersSchema> & {
    id: Generated<number>
}

export type Customer = Selectable<CustomersTable>