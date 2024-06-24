import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { cartReducer } from './state/cart/cart.reducer';
import { productReducer } from './state/product/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './state/product/product.effect';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductListComponent,
    ProductDetailComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      product: productReducer,
      cart: cartReducer,
    }),
    EffectsModule.forRoot([ProductEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
