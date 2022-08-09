import create from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist((set) => ({
    cart: [],
    totalAmount: 0,
    addToCart: (product) => {
      set((state) => {
        const isProductAddedIndex = state.cart.findIndex((item) => item._id === product._id);

        if (isProductAddedIndex > -1) {
          const newCart = [...state.cart];
          newCart[isProductAddedIndex].quantity = newCart[isProductAddedIndex].quantity + 1;

          return {
            ...state,
            totalAmount: state.totalAmount + product.price,
            cart: newCart,
          };
        }

        return {
          ...state,
          totalAmount: state.totalAmount + product.price,
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      });
    },
    reduceQuantity: (product) => {
      set((state) => {
        const isProductAddedIndex = state.cart.findIndex((item) => item._id === product._id);

        if (isProductAddedIndex > -1) {
          const newCart = [...state.cart];
          newCart[isProductAddedIndex].quantity = newCart[isProductAddedIndex].quantity - 1;
          // if quantity becomes 0, remove from cart
          if (newCart[isProductAddedIndex].quantity === 0) {
            newCart.splice(isProductAddedIndex, 1);
          }

          return {
            ...state,
            totalAmount: state.totalAmount + product.price,
            cart: newCart,
          };
        }

        return state;
      });
    },
    clearCart: () => {
      set((state) => ({ ...state, cart: [], totalAmount: 0 }));
    },
  })),
);

export { useCartStore };
