import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { Cart, CartItem } from './models/cart';
import { HttpClient } from '@angular/common/http';
// import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  cart: Cart = {
    cartId: new Date().getTime(),
    cartItems: [],
  };

  get totalItems(): number {
    return this.cart.cartItems.length
  }

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<Product[]>('http://localhost:3000/api/v1/coffees')
      .subscribe((products: Product[]) => {
        this.products = products;
      });
    // this.products = await firstValueFrom(products$)

  }

  selectProduct(product: Product | null): void {
    this.selectedProduct = product;
  }

  addToCart(product: Product): void {
    console.log(product);
    const newCartItem: CartItem = {
      itemId: product.id,
      productName: product.name,
      unitPrice: product.price,
      quantity: 1,
    };
    this.cart.cartItems.push(newCartItem);
    // this.totalItems = this.cart.cartItems.length;
  }

  resetCart(): void {
    this.cart = {
      cartId: new Date().getTime(),
      cartItems: [],
    };
    // this.totalItems = this.cart.cartItems.length;
  }
}
