import { defineStore } from "pinia";

type CartItem = {
    sku: string,
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

export const useCartLocal = defineStore('cart', {
    state: (): CartStore => ({
        items: [],
        orderDetails: {
            discount: null,
            bonusCard: null,
            tax: 50,
            shipping: 29
        }
    }),

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
        addProduct(item: CartItem) {
            console.log(item)

            const ix = this.items.findIndex(({ sku }) => sku === item.sku)

            if (ix !== -1) {
                this.items[ix]!.quantity += 1
            } else {
                this.items.push(item)
            }

            console.log(this.items)
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
    },
    persist: true
})

