import { Component, effect, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [JsonPipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  id = input<string>();
  selectedProduct = this.productService.selectedProduct;

  constructor() {
    effect(() => {
      this.productService.getProductById(Number(this.id()));
    }, { allowSignalWrites: true })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
