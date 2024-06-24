import { createReducer, on } from '@ngrx/store';
import { CartState, CartItem } from '../../models/cart';
import { CartActions } from './cart.actions';

const initialState: Readonly<CartState> = {
  cartId: Date.now(),
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, action) => {
    const hasCartItem = state.cartItems.find(
      (item) => item.itemId === action.product.id
    );

    if (!hasCartItem) {
      const newCartItem: CartItem = {
        itemId: action.product.id,
        productName: action.product.name,
        unitPrice: action.product.price,
        quantity: 1,
      };
      return { ...state, cartItems: [...state.cartItems, newCartItem] };
    } else {
      const updatedCartItems = state.cartItems.map((item) =>
        item.itemId === action.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, cartItems: updatedCartItems };
    }
  }),
  on(CartActions.resetCart, (state) => ({
    ...state,
    cartId: Date.now(),
    cartItems: [],
  }))
);
