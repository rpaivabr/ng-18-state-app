import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  // @Input() products: Product[] = [];
  // @Output() addToCart = new EventEmitter<Product>();
  // @Output() goToProduct = new EventEmitter<Product>();
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts();
  }
}
