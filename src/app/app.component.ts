import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  totalItems = this.cartService.totalItems;

  constructor(private cartService: CartService) {}

  resetCart(): void {
    this.cartService.resetCart();
  }
}
