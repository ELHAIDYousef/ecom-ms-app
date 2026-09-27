import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  {
    path: 'customers',
    loadComponent: () =>
      import('./features/customers/customer-list/customer-list').then(m => m.CustomerList)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/product-list/product-list').then(m => m.ProductList)
  },
  {
    path: 'bills',
    loadComponent: () =>
      import('./features/billing/bill-list/bill-list').then(m => m.BillList)
  },
  {
    path: 'bills/:id',
    loadComponent: () =>
      import('./features/billing/bill-detail/bill-detail').then(m => m.BillDetail)
  },
  // add as you build them:
  // { path: 'products', loadComponent: () => import('./features/products/product-list/product-list').then(m => m.ProductList) },
  // { path: 'bills', loadComponent: () => import('./features/billing/bill-list/bill-list').then(m => m.BillList) },
];
