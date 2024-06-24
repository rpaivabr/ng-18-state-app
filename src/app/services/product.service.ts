import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  async getProducts(): Promise<Product[]> {
    const products$ =  this.httpClient.get<Product[]>(
      'http://localhost:3000/api/v1/coffees'
    );
    return firstValueFrom(products$);
  }

  async getProductById(id: number): Promise<Product> {
    const product$ = this.httpClient.get<Product>(
      `http://localhost:3000/api/v1/coffees/${id}`
    );
    return firstValueFrom(product$);
  }

}
