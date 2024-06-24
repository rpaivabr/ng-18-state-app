import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  // @Input() product!: Product;
  // @Output() addToCart = new EventEmitter<void>();
  // @Output() returnToList = new EventEmitter<void>();
  product: Product | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  async ngOnInit(): Promise<void> {
    const { id } = this.route.snapshot.params;
    console.log(id);
    try {
      this.product = await this.productService.getProductById(+id);
    } catch (error) {
      this.router.navigate(['not-found'], { skipLocationChange: true });
    }
  }
}
