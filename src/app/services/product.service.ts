import { Injectable, inject } from '@angular/core';
import { ProductState } from '../models/product';
import { Store } from '@ngrx/store';
import {
  selectFilteredProducts,
  selectProducts,
  selectSearch,
  selectSelectedProduct,
} from '../state/product/product.selectors';
import { ProductActions } from '../state/product/product.actions';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly store = inject(Store<{ product: ProductState }>);
  // private readonly store = inject(CartStore);
  products = this.store.selectSignal(selectProducts);
  search = this.store.selectSignal(selectSearch);
  filteredProducts = this.store.selectSignal(selectFilteredProducts);
  selectedProduct = this.store.selectSignal(selectSelectedProduct);

  getProducts(): void {
    this.store.dispatch(ProductActions.getProducts());
  }

  getProductById(id: number): void {
    this.store.dispatch(ProductActions.getProductById({ id }));
  }

  setSearch(search: string): void {
    this.store.dispatch(ProductActions.setSearch({ search }));
  }
}
