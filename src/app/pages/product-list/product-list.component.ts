import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
// import { interval } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts();
    // interval(1000).subscribe(value => {
    //   console.log(value);
    // })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
