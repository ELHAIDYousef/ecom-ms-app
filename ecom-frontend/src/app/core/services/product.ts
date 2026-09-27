import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENDPOINTS } from '../config/api.config';
import { Product } from '../models/product.model';

interface HalCollection<T> {
  _embedded: { [key: string]: T[] };
}

@Service()
export class ProductService {

  private readonly http = inject(HttpClient);

  getAll(): Observable<Product[]> {
    return this.http
      .get<HalCollection<Product>>(ENDPOINTS.products)
      .pipe(map(res => res._embedded['products'] ?? []));
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${ENDPOINTS.products}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(ENDPOINTS.products, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${ENDPOINTS.products}/${id}`, product);
  }

  patch(id: number, partial: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${ENDPOINTS.products}/${id}`, partial);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ENDPOINTS.products}/${id}`);
  }
}
