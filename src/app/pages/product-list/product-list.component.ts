import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products$ = this.productService.products$;
  // filteredProducts$ = this.productService.filteredProducts$;
  // search = new FormControl('', { nonNullable: true });

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts();
    // this.productService.search$.subscribe(search => {
    //   this.search.setValue(search);
    // })
    // this.search.valueChanges.subscribe(search => {
    //   this.productService.setSearch(search.trim());
    // })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
