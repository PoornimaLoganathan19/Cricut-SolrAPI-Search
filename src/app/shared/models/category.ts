import { Product } from "./product";

export class Category {
  categoryId: string;
  displayName: string;
  subCategories: Category[];
  description: string;
  basePrice: number;
  url: string;
  products: Product[];
}
