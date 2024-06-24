import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  selectedProduct$ = this.productService.selectedProduct$;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.productService.getProductById(Number(id));
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
