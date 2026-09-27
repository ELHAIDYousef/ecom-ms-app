import { Component, inject, signal, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BillingService } from '../../../core/services/billing';
import { Bill } from '../../../core/models/bill.model';

@Component({
  selector: 'app-bill-detail',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './bill-detail.html',
  styleUrl: './bill-detail.css'
})
export class BillDetail implements OnInit {

  private readonly billingService = inject(BillingService);
  private readonly route = inject(ActivatedRoute);

  readonly bill = signal<Bill | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.billingService.getFullBill(id).subscribe({
      next: (data) => { this.bill.set(data); this.loading.set(false); },
      error: (err) => { this.error.set('Failed to load bill: ' + err.message); this.loading.set(false); }
    });
  }
}
