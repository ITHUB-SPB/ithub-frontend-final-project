import { defineStore } from "pinia";

type CartItem = {
  id: number;
  title: string;
  currentPrice: number;
  quantity: number;
};

type OrderDetails = {
  discount: number | null;
  bonusCard: number | null;
  tax: number;
  shipping: number;
};

type CartStore = {
  items: CartItem[];
  orderDetails: OrderDetails;
};

export const useCartLocal = defineStore("cart-local", {
  state: (): CartStore => ({
    items: [],
    orderDetails: {
      discount: null,
      bonusCard: null,
      tax: 50,
      shipping: 29,
    },
  }),

  getters: {
    hasProduct(state) {
      return (id: number) => Boolean(state.items.find((item) => item.id === id));
    },

    subTotal(state): number {
      return state.items.reduce((acc, { currentPrice, quantity }) => {
        return acc + currentPrice * quantity;
      }, 0);
    },
    total(state): number {
      const { tax, shipping } = state.orderDetails;
      return this.subTotal + tax + shipping;
    },
  },

  actions: {
    addProduct(newItem: CartItem) {
      const ix = this.items.findIndex(({ id }) => id === newItem.id);

      if (ix !== -1) {
        this.items[ix]!.quantity += 1;
      } else {
        this.items.push(newItem);
      }
    },

    changeQuantity(updatedItem: CartItem) {
      const ix = this.items.findIndex(({ id }) => id === updatedItem.id);

      if (ix === -1 || updatedItem.quantity < 0) {
        return;
      }

      if (updatedItem.quantity === 0) {
        this.items.splice(ix, 1);
        return;
      }

      this.items[ix]!.quantity = updatedItem.quantity;
    },

    clear() {
      this.items = [];
    },
  },
  persist: true,
});
