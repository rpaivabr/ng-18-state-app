import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap } from 'rxjs';
import { Product, ProductState } from '../models/product';
import { ProductApiService } from '../services/product-api.service';

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  search: '',
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products, search }) => ({
    filteredProducts: computed(() =>
      !search()
        ? products()
        : products().filter((p) =>
            p.name.toLowerCase().includes(search().toLowerCase())
          )
    ),
  })),
  withMethods((store, productApiService = inject(ProductApiService)) => ({
    setProducts(products: Product[]): void {
      patchState(store, { products });
    },
    setSelectedProduct(selectedProduct: Product): void {
      patchState(store, { selectedProduct });
    },
    setSearch(search: string): void {
      patchState(store, { search });
    },
    getProducts: rxMethod<void>(
      pipe(
        // tap(() => patchState(store, { isLoading: true }))
        switchMap(() => productApiService.getProducts()),
        map((products) => patchState(store, { products }))
      )
    ),
    getProductsById: rxMethod<number>(
      pipe(
        switchMap((id) => productApiService.getProductById(id)),
        map((selectedProduct) => patchState(store, { selectedProduct }))
      )
    ),
  }))
);
