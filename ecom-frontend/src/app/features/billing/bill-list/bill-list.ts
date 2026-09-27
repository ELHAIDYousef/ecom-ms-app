import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BillingService } from '../../../core/services/billing';
import { Bill } from '../../../core/models/bill.model';

@Component({
  selector: 'app-bill-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './bill-list.html',
  styleUrl: './bill-list.css'
})
export class BillList implements OnInit {

  private readonly billingService = inject(BillingService);

  readonly bills = signal<Bill[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.billingService.getAll().subscribe({
      next: (data) => { this.bills.set(data); this.loading.set(false); },
      error: (err) => { this.error.set('Failed to load bills: ' + err.message); this.loading.set(false); }
    });
  }
}
