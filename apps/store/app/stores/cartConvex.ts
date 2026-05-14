import { defineStore } from "pinia";
import { api } from "@repo/convex/api";
import type { DataModel } from "@repo/convex/dataModel";

type Sku = DataModel["products"]["document"]["_id"]
type CustomerId = DataModel["customers"]["document"]["_id"]

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

export const useCartConvex = defineStore('cart', {
    state: async (): Promise<CartStore> => {
        const convex = useConvex()

        const { user } = useConvexAuth()
        const items = await convex.query(api.carts.getByCustomer, { customer: user._id })

        return {
            items,
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
        productTotal() {
            return (price: number, quantity: number): number => price * quantity
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
        async addProduct(item: CartItem, customerId: CustomerId) {
            const convex = useConvex()

            await convex.mutation(api.carts.updateProduct, {
                product: item.sku,
                quantity: item.quantity,
                customer: customerId
            })
        },

        changeQuantity(sku: string, newValue: number) {
            const ix = this.items.findIndex((item) => sku === item.sku)

            if ((ix === -1) || (newValue < 0)) {
                return
            }

            if (newValue === 0) {
                this.items.splice(ix, 1)
                return
            }

            this.items[ix]!.quantity = newValue
        },

        clear() {
            this.items = []
        }
    }
})

