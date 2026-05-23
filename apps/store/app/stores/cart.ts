import { defineStore } from "pinia";

type CartItem = {
    id: number,
    title: string,
    currentPrice: number,
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

export const useCart = defineStore('cart', {
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
            return (id: number) => Boolean(state.items.find(item => item.id === id))
        },
        subTotal(state): number {
            return state.items.reduce((acc, { currentPrice, quantity }) => {
                return acc + price * quantity
            }, 0)
        },
        total(state): number {
            const { tax, shipping } = state.orderDetails
            return this.subTotal + tax + shipping
        }
    },

    actions: {
        async fetch(customerEmail: string) {
            const { $client } = useNuxtApp()

            this.items = await $client.carts.list({ customerEmail })
        },

        async _mutateProduct(item: CartItem, customerEmail: string) {
            const { $client } = useNuxtApp()

            await $client.carts.update({
                productId: item.id,
                quantity: item.quantity,
                customerEmail
            })
        },

        async addProduct(newItem: CartItem, customerEmail: string) {
            await this._mutateProduct(newItem, customerEmail)
            await this.fetch(customerEmail)
        },

        async changeQuantity(updatedItem: CartItem, customerEmail: string) {
            await this._mutateProduct(updatedItem, customerEmail)
            await this.fetch(customerEmail)
        },

        async clear(customerEmail: string) {
            const { $client } = useNuxtApp()

            await $client.carts.clear({ customerEmail })
            await this.fetch(customerEmail)
        }
    }
})

