import { Injectable, computed, inject } from '@angular/core';
import { Product } from '../models/product';
import { CartState } from '../models/cart';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../state/cart/cart.selectors';
import { CartActions } from '../state/cart/cart.actions';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly store = inject(Store<{ cart: CartState }>);
  // private readonly store = inject(CartStore);
  cartItems = this.store.selectSignal(selectCartItems);
  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addItem({ product }));
  }

  resetCart(): void {
    this.store.dispatch(CartActions.resetCart());
  }
}
