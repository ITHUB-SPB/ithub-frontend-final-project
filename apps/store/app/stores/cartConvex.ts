import { defineStore } from "pinia";
import { api } from "@repo/convex/api";
import type { DataModel } from "@repo/convex/dataModel";

type Sku = DataModel["products"]["document"]["_id"]
type CustomerEmail = DataModel["customers"]["document"]["email"]

type CartItem = {
    sku: Sku,
    title: string,
    price: number,
    quantity: number
}

type OrderDetails = {
    discount: number | null;
    bonusCard: number | null;
    tax: number;
    shipping: number;
}

type CartStore = {
    items: CartItem[],
    orderDetails: OrderDetails
}

export const useCartConvex = defineStore('cart-convex', {
    state: (): CartStore => {
        return {
            items: [],
            orderDetails: {
                discount: null,
                bonusCard: null,
                tax: 50,
                shipping: 29
            }
        }
    },

    getters: {
        hasProduct(state) {
            return (sku: string) => Boolean(state.items.find(item => item.sku === sku))
        },
        subTotal(state): number {
            return state.items.reduce((acc, { price, quantity }) => {
                return acc + price * quantity
            }, 0)
        },
        total(state): number {
            const { tax, shipping } = state.orderDetails
            return this.subTotal + tax + shipping
        }
    },

    actions: {
        async fetch(customerEmail: CustomerEmail) {
            const convex = useConvex()

            this.items = await convex.query(api.carts.getByCustomer, { customerEmail })
        },

        async _mutateProduct(item: CartItem, customerEmail: CustomerEmail) {
            const convex = useConvex()

            await convex.mutation(api.carts.updateProduct, {
                product: item.sku,
                quantity: item.quantity,
                customerEmail
            })
        },

        async addProduct(newItem: CartItem, customerEmail: CustomerEmail) {
            await this._mutateProduct(newItem, customerEmail)
        },

        async changeQuantity(updatedItem: CartItem, customerEmail: CustomerEmail) {
            await this._mutateProduct(updatedItem, customerEmail)
        },

        async clear(customerEmail: CustomerEmail) {
            const convex = useConvex()
            await convex.mutation(api.carts.clearByCustomer, { customerEmail })
        }
    }
})

