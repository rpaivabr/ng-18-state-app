import { ProductState } from '../../models/product';

export const selectProducts = (state: { product: ProductState }) =>
  state.product.products;

export const selectSelectedProduct = (state: { product: ProductState }) =>
  state.product.selectedProduct;
