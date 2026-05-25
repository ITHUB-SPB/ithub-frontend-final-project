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
                return acc + currentPrice * quantity
            }, 0)
        },
        total(state): number {
            const { tax, shipping } = state.orderDetails
            return this.subTotal + tax + shipping
        }
    },

    actions: {
        async fetch() {
            this.items = await $fetch('/api/cart')
        },

        async _mutateProduct(item: CartItem) {
            await $fetch('/api/cart', {
                method: 'patch',
                body: {
                    productId: item.id,
                    quantity: item.quantity
                }
            })
        },

        async addProduct(newItem: CartItem) {
            await this._mutateProduct(newItem)
            await this.fetch()
        },

        async changeQuantity(updatedItem: CartItem) {
            await this._mutateProduct(updatedItem)
            await this.fetch()
        },

        async clear() {
            await $fetch('/api/cart', {
                method: 'DELETE',
            })
            await this.fetch()
        }
    }
})

