import {Product} from './product.model';
import {Customer} from './customer.model';

export interface ProductItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product | null;
}

export interface Bill {
  id: number;
  billingDate: string;
  customerId: number;
  customer: Customer | null;
  productItems: ProductItem[];
}
