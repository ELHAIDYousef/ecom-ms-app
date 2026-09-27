import { Component, inject, signal, OnInit } from '@angular/core';
import { CustomerService } from '../../../core/services/customer';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css'
})
export class CustomerList implements OnInit {

  private readonly customerService = inject(CustomerService);

  // signals for state — the modern way
  readonly customers = signal<Customer[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.customerService.getAll().subscribe({
      next: (data) => {
        this.customers.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load customers: ' + err.message);
        this.loading.set(false);
      }
    });
  }
}
