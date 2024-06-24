import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart: Cart = {
    cartId: new Date().getTime(),
    cartItems: [],
  };
  private totalItems$$ = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItems$$.asObservable();
  // totalItems = this.cart.cartItems.length;

  // get totalItems(): number {
  //   return this.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // }

  addToCart(product: Product): void {
    const hasCartItem = this.cart.cartItems.find(
      (item) => item.itemId === product.id
    );
    if (!hasCartItem) {
      const newCartItem: CartItem = {
        itemId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity: 1,
      };
      this.cart = {
        ...this.cart,
        cartItems: [...this.cart.cartItems, newCartItem],
      };
    } else {
      this.cart = {
        ...this.cart,
        cartItems: this.cart.cartItems.map((item) =>
          item.itemId !== hasCartItem.itemId
            ? item
            : { ...item, quantity: item.quantity + 1 }
        ),
      };
    }
    console.log(this.cart);
    // this.totalItems = this.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    // console.log(this.totalItems);
    const total = this.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalItems$$.next(total);
    console.log(this.totalItems$$.value);
  }

  resetCart(): void {
    this.cart = {
      cartId: new Date().getTime(),
      cartItems: [],
    };
  }
}
