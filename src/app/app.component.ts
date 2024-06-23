import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { Cart, CartItem } from './models/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  cart: Cart = {
    cartId: new Date().getTime(),
    cartItems: [],
  };
  totalItems: number = 0;

  ngOnInit(): void {
    fetch('http://localhost:3000/api/v1/coffees')
      .then((res) => res.json())
      .then((products: Product[]) => {
        this.products = products;
      });
  }

  addToCart(product: Product): void {
    console.log(product);
    // const newCartItem: CartItem = {
    //   itemId: product.id,
    //   productName: product.name,
    //   unitPrice: product.price,
    //   quantity: 1,
    // };
    // this.cart.cartItems.push(newCartItem);
    // this.totalItems = this.cart.cartItems.length;
  }

  // resetCart(): void {
  //   this.cart = {
  //     cartId: new Date().getTime(),
  //     cartItems: [],
  //   };
  // }
}
