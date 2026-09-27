import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../config/api.config';
import { Bill } from '../models/bill.model';

@Service()
export class BillingService {

  private readonly http = inject(HttpClient);

  // GET /bills
  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(ENDPOINTS.bills);
  }

  // GET /bills/{id}
  getById(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${ENDPOINTS.bills}/${id}`);
  }

  // GET /bills/full/{id}  
  getFullBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${ENDPOINTS.bills}/full/${id}`);
  }
}
