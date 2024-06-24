import { createReducer, on } from '@ngrx/store';
import { ProductState } from '../../models/product';
import { ProductActions } from './product.actions';

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.setProducts, (state, { products }) => ({
    ...state,
    products,
  })),
  on(ProductActions.setSelectedProduct, (state, { product }) => ({
    ...state,
    selectedProduct: product,
  }))
);
