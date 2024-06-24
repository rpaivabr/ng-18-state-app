import { Injectable } from '@angular/core';
import { ProductState } from '../models/product';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectSelectedProduct,
} from '../state/product/product.selectors';
import { ProductActions } from '../state/product/product.actions';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products$ = this.store.select(selectProducts);
  selectedProduct$ = this.store.select(selectSelectedProduct);

  constructor(private store: Store<{ product: ProductState }>) {}

  getProducts(): void {
    console.log('product service')
    this.store.dispatch(ProductActions.getProducts());
  }

  getProductById(id: number): void {
    this.store.dispatch(ProductActions.getProductById({ id }));
  }
}
