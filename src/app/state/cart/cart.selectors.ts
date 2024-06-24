import { CartState } from '../../models/cart';

export const selectCartItems = (state: { cart: CartState }) => state.cart.cartItems;

export const selectTotalItems = (state: { cart: CartState }) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
