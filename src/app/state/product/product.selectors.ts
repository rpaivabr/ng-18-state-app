import { ProductState } from '../../models/product';

export const selectProducts = (state: { product: ProductState }) =>
  state.product.products;

export const selectSelectedProduct = (state: { product: ProductState }) =>
  state.product.selectedProduct;

export const selectFilteredProducts = ({
  product: { products, search },
}: {
  product: ProductState;
}) =>
  !search
    ? products
    : products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

export const selectSearch = (state: { product: ProductState }) =>
  state.product.search;
