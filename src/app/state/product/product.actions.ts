import { props, emptyProps, createActionGroup } from '@ngrx/store';
import { Product } from '../../models/product';

export const ProductActions = createActionGroup({
  source: '[Product]',
  events: {
    'Get Products': emptyProps(),
    'Set Products': props<{ products: Product[] }>(),
    'Get Product By Id': props<{ id: number }>(),
    'Set Selected Product': props<{ product: Product }>(),
    // 'Set Search': props<{ search: string }>(),
  },
});
