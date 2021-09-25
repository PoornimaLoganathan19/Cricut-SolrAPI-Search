import { Product } from "./product";

export class Entry {
  id: number;
  quantity: number;
  totalPrice: number;
  product: Product;
  totalTax: string;
  unitOfMeasure: string;
}
