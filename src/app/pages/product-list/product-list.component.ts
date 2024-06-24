import { Component, inject } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  products = this.productService.products;
  filteredProducts = this.productService.filteredProducts;
  search = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.productService.getProducts();
    this.search.setValue(this.productService.search());
    this.search.valueChanges.subscribe(search => {
      this.productService.setSearch(search.trim());
    })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
