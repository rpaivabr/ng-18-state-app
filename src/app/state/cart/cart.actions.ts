import { props, emptyProps, createActionGroup } from '@ngrx/store';
import { Product } from '../../models/product';

export const CartActions = createActionGroup({
  source: '[Cart]',
  events: {
    'Add Item': props<{ product: Product }>(),
    'Reset Cart': emptyProps(),
  },
});
