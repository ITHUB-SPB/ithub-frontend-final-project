import * as brands from './brands'
import * as carts from './carts'


export const router = {
    brands: {
        list: brands.list,
        find: brands.find,
        create: brands.create
    },
    carts: {
        list: carts.list,
        clear: carts.clear,
        update: carts.update
    }
}
