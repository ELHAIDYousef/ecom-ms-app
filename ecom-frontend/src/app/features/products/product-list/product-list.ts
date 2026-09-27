import { Component, inject, signal, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  imports: [
    CurrencyPipe
  ],
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  private readonly productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data) => { this.products.set(data); this.loading.set(false); },
      error: (err) => { this.error.set('Failed to load products: ' + err.message); this.loading.set(false); }
    });
  }
}
