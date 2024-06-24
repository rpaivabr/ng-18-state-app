import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { CartItem, CartState } from '../models/cart';
import { Product } from '../models/product';

const initialState: CartState = {
  cartId: Date.now(),
  cartItems: [],
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ cartItems }) => ({
    totalItems: computed(() =>
      cartItems().reduce((sum, item) => sum + item.quantity, 0)
    ),
  })),
  withMethods((store) => ({
    addItem(product: Product): void {
      const hasCartItem = store
        .cartItems()
        .find((item) => item.itemId === product.id);

      if (!hasCartItem) {
        const newCartItem: CartItem = {
          itemId: product.id,
          productName: product.name,
          unitPrice: product.price,
          quantity: 1,
        };
        patchState(store, (state) => ({
          cartItems: [...state.cartItems, newCartItem],
        }));
      } else {
        const updatedCartItems = store
          .cartItems()
          .map((item) =>
            item.itemId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        patchState(store, { cartItems: updatedCartItems });
      }
    },
    resetCart(): void {
      patchState(store, { cartId: Date.now(), cartItems: [] });
    },
  }))
);
