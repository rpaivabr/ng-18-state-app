import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private readonly httpClient = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      'http://localhost:3000/api/v1/coffees'
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `http://localhost:3000/api/v1/coffees/${id}`
    );
  }
}
