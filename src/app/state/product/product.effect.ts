import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductApiService } from '../../services/product-api.service';
import { ProductActions } from './product.actions';
import { exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductState } from '../../models/product';
import { selectProducts } from './product.selectors';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private store: Store<{ product: ProductState }>,
    private productApiService: ProductApiService
  ) {}

  getProductsFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProducts),
      exhaustMap(() => this.productApiService.getProducts()),
      map((products) => ProductActions.setProducts({ products }))
    )
  );

  getProductsByIdFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductById),
      withLatestFrom(this.store.select(selectProducts)),
      exhaustMap(([{ id }, products]) => {
        const product = products.find((p) => p.id === id);
        return product
          ? of(product)
          : this.productApiService.getProductById(id);
      }),
      map((product) => {
        console.log(product);
        return ProductActions.setSelectedProduct({ product });
      })
    )
  );
}
