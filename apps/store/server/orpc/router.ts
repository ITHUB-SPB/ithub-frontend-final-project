import * as brands from './brands'
import * as carts from './carts'
import * as products from './products'
import * as characteristics from './products'
import * as categories from './products'


export const router = {
    brands: {
        list: brands.list,
        find: brands.find,
        create: brands.create
    },
    categories: {
        list: categories.list,
        create: categories.create,
    },
    characteristics: {
        list: characteristics.list,
        create: characteristics.create,
    },
    carts: {
        list: carts.list,
        clear: carts.clear,
        update: carts.update
    },
    products: {
        list: products.list,
        create: products.create
    }
}
