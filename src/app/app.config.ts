import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { productReducer } from './state/product/product.reducer';
import { cartReducer } from './state/cart/cart.reducer';
import { provideEffects } from '@ngrx/effects';
import { ProductEffect } from './state/product/product.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(routes, withComponentInputBinding()),
    provideStore({
      product: productReducer,
      cart: cartReducer,
    }),
    provideEffects([ProductEffect]),
  ],
};
