import { Component, OnInit } from '@angular/core';
import { Product } from './models/product';
import { Cart } from './models/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  cart: Cart = {
    cartId: new Date().getTime(),
    cartItems: []
  }
  totalItems: number = 0;

  ngOnInit(): void {
    // const ulEl = document.getElementById('list') as HTMLUListElement;
    // const headerEl = document.getElementById('header') as HTMLDivElement;

    fetch('http://localhost:3000/api/v1/coffees')
      .then(res => res.json())
      .then((products: Product[]) => console.log(products))
      // .then((products: Product[]) => {
      //   this.products = products;
      //   products.forEach(product => {
      //     const liEl = document.createElement('li');
      //     const spanEl = document.createElement('span');
      //     spanEl.innerHTML = product.name;
      //     const btnEl = document.createElement('button');
      //     btnEl.innerHTML = 'Add';
      //     btnEl.addEventListener('click', () => {
      //       const newCartItem: CartItem = {
      //         itemId: product.id,
      //         productName: product.name,
      //         unitPrice: product.price,
      //         quantity: 1
      //       }
      //       this.cart.cartItems.push(newCartItem);
      //       this.totalItems = this.cart.cartItems.length;
      //       headerEl.innerHTML = `Cart Items: ${this.totalItems}`
      //     })
      //     liEl.appendChild(spanEl);
      //     liEl.appendChild(btnEl);
      //     ulEl.appendChild(liEl);
      //   })
      // })
  }
}
