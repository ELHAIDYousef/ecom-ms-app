import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ENDPOINTS } from '../config/api.config';
import { Customer } from '../models/customer.model';

interface HalCollection<T> {
  _embedded: { [key: string]: T[] };
}

@Service()
export class CustomerService {

  private readonly http = inject(HttpClient);

  // GET /customers  (unwrap HAL _embedded)
  getAll(): Observable<Customer[]> {
    return this.http
      .get<HalCollection<Customer>>(ENDPOINTS.customers)
      .pipe(map(res => res._embedded['customers'] ?? []));
  }

  // GET /customers/{id}
  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${ENDPOINTS.customers}/${id}`);
  }

  // POST /customers
  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(ENDPOINTS.customers, customer);
  }

  // PUT /customers/{id}  (full replace)
  update(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${ENDPOINTS.customers}/${id}`, customer);
  }

  // PATCH /customers/{id}  (partial update)
  patch(id: number, partial: Partial<Customer>): Observable<Customer> {
    return this.http.patch<Customer>(`${ENDPOINTS.customers}/${id}`, partial);
  }

  // DELETE /customers/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ENDPOINTS.customers}/${id}`);
  }
}
