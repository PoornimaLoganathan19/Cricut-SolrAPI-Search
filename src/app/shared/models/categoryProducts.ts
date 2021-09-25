import { Product } from "src/app/shared/models/product";

export class CategoryProducts {
  categoryId: string;
  categoryName: string;
  description: string;
  basePrice: number;
  url: string;
  products: Product[];
}
