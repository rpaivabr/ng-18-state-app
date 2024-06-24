import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { CartState } from '../models/cart';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../state/cart/cart.selectors';
import { CartActions } from '../state/cart/cart.actions';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems$ = this.store.select(selectCartItems);
  totalItems$ = this.cartItems$.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  constructor(private store: Store<{ cart: CartState }>) {}

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addItem({ product }));
  }

  resetCart(): void {
    this.store.dispatch(CartActions.resetCart());
  }
}
