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

export const useCart = defineStore('cart', {
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
        productTotal() {
            return (price: number, quantity: number): number => {
                return price * quantity
            }
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
    }
}) 