import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { Cart, CartItem } from './models/cart';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
    return this.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  constructor(private httpClient: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const products$ = this.httpClient
      .get<Product[]>('http://localhost:3000/api/v1/coffees')
    this.products = await firstValueFrom(products$);
  }

  selectProduct(product: Product | null): void {
    this.selectedProduct = product;
  }

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
  }

  resetCart(): void {
    this.cart = {
      cartId: new Date().getTime(),
      cartItems: [],
    };
  }
}
