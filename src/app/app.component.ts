import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  totalItems = 0;
  // get totalItems(): number {
  //   return this.cartService.totalItems;
  // }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // this.totalItems = this.cartService.totalItems;
    this.subscription = this.cartService.totalItems$.subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetCart(): void {
    this.cartService.resetCart();
  }
}
